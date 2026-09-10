if (requireAuthOrRedirect()) {
    const cvUploadForm = document.getElementById('cvUploadForm');
    const cvFile = document.getElementById('cvFile');
    const uploadCvButton = document.getElementById('uploadCvButton');
    const cvUploadStatus = document.getElementById('cvUploadStatus');
    const activeCvContainer = document.getElementById('activeCv');
    const cvArchiveContainer = document.getElementById('cvArchive');

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.replace('/admin/login.html');
    });

    cvUploadForm.addEventListener('submit', uploadCv);
    loadProjects();
    loadCvDocuments();

    async function uploadCv(event) {
        event.preventDefault();
        const file = cvFile.files[0];
        if (!file) return setCvStatus('Pilih file CV PDF terlebih dahulu.');

        const formData = new FormData();
        formData.append('file', file);
        uploadCvButton.disabled = true;
        setCvStatus('Mengunggah CV...');

        try {
            const res = await apiFetch('/upload/cv', { method: 'POST', body: formData });
            if (!res) return;
            const data = await readResponse(res);
            if (!res.ok) return setCvStatus(data.message || 'Upload CV gagal.');

            cvFile.value = '';
            setCvStatus('CV terbaru berhasil diunggah.');
            await loadCvDocuments();
        } catch (error) {
            setCvStatus('Upload CV gagal. Coba lagi.');
        } finally {
            uploadCvButton.disabled = false;
        }
    }

    async function loadCvDocuments() {
        const res = await apiFetch('/cv');
        if (!res) return;
        const data = await readResponse(res);
        if (!res.ok) return setCvStatus(data.message || 'Gagal memuat CV.');

        renderActiveCv(data.activeCv);
        renderArchive(data.archivedCvs);
    }

    function renderActiveCv(cv) {
        activeCvContainer.replaceChildren();
        if (!cv) {
            activeCvContainer.append(createParagraph('Belum ada CV aktif. Upload PDF pertama untuk memulai.', 'cv-empty'));
            return;
        }

        activeCvContainer.append(
            createParagraph('CV aktif', 'eyebrow'),
            createCvDocumentRow(cv, { canActivate: false }),
        );
    }

    function renderArchive(documents) {
        cvArchiveContainer.replaceChildren();
        if (!documents.length) {
            cvArchiveContainer.append(createParagraph('Belum ada CV dalam arsip.', 'cv-empty'));
            return;
        }
        documents.forEach((cv) => cvArchiveContainer.append(createCvDocumentRow(cv, { canActivate: true })));
    }

    function createCvDocumentRow(cv, { canActivate }) {
        const row = document.createElement('div');
        row.className = 'cv-document-row';

        const details = document.createElement('div');
        details.append(
            createParagraph(cv.fileName, 'cv-document-name'),
            createParagraph(`Uploaded ${formatDate(cv.createdAt)}`, 'cv-document-meta'),
        );

        const actions = document.createElement('div');
        actions.className = 'cv-document-actions';
        actions.append(createLink('Open', cv.url));
        if (canActivate) actions.append(createButton('Make active', () => activateCv(cv.id)));
        actions.append(createButton('Delete', () => deleteCv(cv), 'btn-sm-danger'));

        row.append(details, actions);
        return row;
    }

    async function activateCv(id) {
        if (!confirm('Jadikan CV ini sebagai CV aktif?')) return;
        const res = await apiFetch(`/cv/${id}/activate`, { method: 'PATCH' });
        if (!res) return;
        const data = await readResponse(res);
        if (!res.ok) return setCvStatus(data.message || 'Gagal mengaktifkan CV.');
        setCvStatus('CV aktif diperbarui.');
        await loadCvDocuments();
    }

    async function deleteCv(cv) {
        if (!confirm(`Hapus ${cv.fileName}? File ini akan dihapus permanen.`)) return;
        const res = await apiFetch(`/cv/${cv.id}`, { method: 'DELETE' });
        if (!res) return;
        if (!res.ok) {
            const data = await readResponse(res);
            return setCvStatus(data.message || 'Gagal menghapus CV.');
        }
        setCvStatus('CV berhasil dihapus.');
        await loadCvDocuments();
    }

    function createLink(text, url) {
        const link = document.createElement('a');
        link.className = 'btn-sm';
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener';
        link.textContent = text;
        return link;
    }

    function createButton(text, handler, className = 'btn-sm') {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = className;
        button.textContent = text;
        button.addEventListener('click', handler);
        return button;
    }

    function createParagraph(text, className) {
        const paragraph = document.createElement('p');
        paragraph.className = className;
        paragraph.textContent = text;
        return paragraph;
    }

    function setCvStatus(message) {
        cvUploadStatus.textContent = message;
    }

    async function readResponse(res) {
        try {
            return await res.json();
        } catch (error) {
            return {};
        }
    }

    function formatDate(value) {
        return new Intl.DateTimeFormat('en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(new Date(value));
    }
}

async function loadProjects() {
    const res = await apiFetch('/projects');
    if (!res) return;
    const projects = await res.json();
    const container = document.getElementById('projectList');

    container.innerHTML = projects.map(p => `
    <div class="project-card">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <p class="tech">${p.techStack}</p>
      <div class="card-actions">
        <a href="project-form.html?id=${p.id}" class="btn-sm">Edit</a>
        <button class="btn-sm-danger" onclick="deleteProject(${p.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

async function deleteProject(id) {
    if (!confirm('Delete this project?')) return;
    await apiFetch(`/projects/${id}`, { method: 'DELETE' });
    loadProjects();
}
