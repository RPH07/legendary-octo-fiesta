tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        "nb-bg": "var(--nb-bg)",
                        "nb-text": "var(--nb-text)",
                        "nb-black": "var(--nb-black)",
                        "nb-yellow": "var(--nb-yellow)",
                        "nb-coral": "var(--nb-coral)",
                        "nb-cyan": "var(--nb-cyan)",
                        "nb-warm": "var(--nb-warm)",
                        "nb-surface": "var(--nb-surface)",
                        "nb-lime": "var(--nb-lime)",
                        "nb-ink": "var(--nb-ink)",
                        "nb-void": "var(--nb-void)",
                    },
                    fontFamily: {
                        display: ['Inter', 'system-ui', 'sans-serif'],
                        mono: ["JetBrains Mono", "monospace"]
                    },
                    fontSize: {
                        'hero': ['clamp(48px,8vw,96px)', { lineHeight: '0.85', fontWeight: '800' }],
                        'hero-sub': ['clamp(20px,3vw,36px)', { lineHeight: '1.15', fontWeight: '700' }],
                        'huge': ['clamp(36px,5vw,64px)', { lineHeight: '1', fontWeight: '800' }],
                        'section': ['clamp(24px,3vw,40px)', { lineHeight: '1.1', fontWeight: '800' }],
                        'card-title': ['clamp(18px,2vw,22px)', { lineHeight: '1.2', fontWeight: '700' }],
                        'body': ['16px', { lineHeight: '1.6' }],
                        'small': ['14px', { lineHeight: '1.5' }],
                        'label': ['12px', { lineHeight: '1', letterSpacing: '0.5px', fontWeight: '700' }],
                        'badge': ['11px', { lineHeight: '1', fontWeight: '700' }],
                        'meta': ['13px', { lineHeight: '1.4' }],
                    },
                    boxShadow: {
                        'nb': '4px 4px 0px 0px var(--nb-black)',
                        'nb-hover': '7px 7px 0px 0px var(--nb-black)',
                        'nb-lg': '6px 6px 0px 0px var(--nb-black)',
                        'nb-sm': '2px 2px 0px 0px var(--nb-black)',
                        'nb-xl': '8px 8px 0px 0px var(--nb-black)',
                        'nb-yellow': '4px 4px 0px 0px var(--nb-yellow)',
                    },
                    borderWidth: {
                        '3': '3px',
                        '4': '4px',
                    },
                }
            }
        }