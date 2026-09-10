const isAuthenticated = requireAuthOrRedirect();

const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');

if (isAuthenticated && projectId) {
  document.getElementById('formTitle').textContent = 'Edit Project';
  loadProject(projectId);
}

async function loadProject(id) {
  const res = await apiFetch(`/projects/${id}`);
  const p = await res.json();
  document.getElementById('title').value = p.title;
  document.getElementById('description').value = p.description;
  document.getElementById('techStack').value = p.techStack;
  document.getElementById('previewUrl').value = p.previewUrl || '';
  document.getElementById('imageUrl').value = p.imageUrl || '';
  if (p.imageUrl) {
    document.getElementById('imagePreview').src = p.imageUrl;
    document.getElementById('imagePreview').style.display = 'block';
  }
}

// Upload gambar duluan, terpisah dari submit form utama
if (isAuthenticated) document.getElementById('imageFile').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  const res = await apiFetch('/upload/project-image', {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();

  document.getElementById('imageUrl').value = data.url;
  document.getElementById('imagePreview').src = data.url;
  document.getElementById('imagePreview').style.display = 'block';
});

if (isAuthenticated) document.getElementById('projectForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    techStack: document.getElementById('techStack').value,
    previewUrl: document.getElementById('previewUrl').value,
    imageUrl: document.getElementById('imageUrl').value,
  };

  const method = projectId ? 'PUT' : 'POST';
  const url = projectId ? `/projects/${projectId}` : '/projects';

  const res = await apiFetch(url, {
    method,
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    window.location.replace('/admin/dashboard.html');
  } else {
    alert('Failed to save project');
  }
});
