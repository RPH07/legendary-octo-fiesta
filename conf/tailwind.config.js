tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        "primary": "#1C1B17",
                        "accent": "#1D4ED8",
                        "bg": "#F7F7F7",
                        "surface": "#EDEAE2",
                        "border": "#D4D0C4",
                        "text-primary": "#1C1B17",
                        "text-secondary": "#6B6456",
                        "text-muted": "#9C9080"
                    },
                    spacing: {
                        "gutter-desktop": "40px",
                        "gutter-mobile": "24px",
                        "vertical-rhythm": "32px",
                        "section-gap-desktop": "96px",
                        "section-gap-mobile": "64px"
                    },
                    fontFamily: {
                        mono: ["IBM Plex Mono", "monospace"]
                    },
                    fontSize: {
                        "hero": ["clamp(32px,5.5vw,60px)", { lineHeight: "1.1", fontWeight: "700" }],
                        "tagline": ["clamp(14px,2vw,17px)", { lineHeight: "1.6", fontWeight: "400" }],
                        "nav": ["12px", { lineHeight: "1", fontWeight: "500" }],
                        "label": ["11px", { lineHeight: "1", letterSpacing: "2px", fontWeight: "500" }],
                        "body": ["15px", { lineHeight: "1.8", fontWeight: "400" }],
                        "heading": ["16px", { lineHeight: "1.4", fontWeight: "600" }],
                        "meta": ["12px", { lineHeight: "1.5", fontWeight: "400" }],
                        "cta": ["13px", { lineHeight: "1", fontWeight: "600" }]
                    }
                }
            }
        }