// JavaScript Logic & Interactive Widgets - Sridhar R Portfolio

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Navigation Scroll Effect & Mobile Nav Toggle
    const header = document.querySelector('.main-header');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        
        // Hamburger animation
        const burger = mobileToggle.querySelector('.hamburger');
        if (navLinksContainer.classList.contains('active')) {
            burger.style.background = 'transparent';
            burger.style.setProperty('--before-transform', 'rotate(45deg) translate(5px, 5px)');
            burger.style.setProperty('--after-transform', 'rotate(-45deg) translate(5px, -5px)');
            // Add fallback styling directly since custom properties in pseudo-elements can be tricky
            burger.classList.add('open');
        } else {
            burger.style.background = 'var(--text-main)';
            burger.classList.remove('open');
        }
    });

    // Add style overrides for hamburger open state
    const burgerStyle = document.createElement('style');
    burgerStyle.innerHTML = `
        .hamburger.open::before { transform: rotate(45deg); top: 0; }
        .hamburger.open::after { transform: rotate(-45deg); bottom: 0; }
    `;
    document.head.appendChild(burgerStyle);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
            mobileToggle.querySelector('.hamburger').classList.remove('open');
            mobileToggle.querySelector('.hamburger').style.background = 'var(--text-main)';
        });
    });


    // 3. Typed Hero Subtitle Animation
    const typedTextSpan = document.getElementById('typed-text');
    const roles = ["Embedded Systems", "Digital Circuits", "VLSI Design", "Verilog HDL", "Automation Solutions"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster deletion
        } else {
            typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // steady typing
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // pause before typing next
        }

        setTimeout(typeEffect, typingSpeed);
    }
    
    if (typedTextSpan) {
        setTimeout(typeEffect, 1000);
    }


    // 4. Scroll Reveal Intersection Observer
    const revealItems = document.querySelectorAll('.reveal-item, .reveal-card');
    const skillBars = document.querySelectorAll('.skill-progress');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });

    // Skill Bar Animation Observer
    const skillsSection = document.getElementById('skills');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    // Trigger skill bar width transition
                    const targetWidth = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 100);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }


    // 5. Interactive 7-Segment FPGA Decoder Simulator Logic
    // Segment mapping table: 7 bits representing [g, f, e, d, c, b, a] active high
    const segDecoderTable = {
        0: { code: '1111110', segments: [1, 1, 1, 1, 1, 1, 0], hex: '0' },
        1: { code: '0110000', segments: [0, 1, 1, 0, 0, 0, 0], hex: '1' },
        2: { code: '1101101', segments: [1, 1, 0, 1, 1, 0, 1], hex: '2' },
        3: { code: '1111001', segments: [1, 1, 1, 1, 0, 0, 1], hex: '3' },
        4: { code: '0110011', segments: [0, 1, 1, 0, 0, 1, 1], hex: '4' },
        5: { code: '1011011', segments: [1, 0, 1, 1, 0, 1, 1], hex: '5' },
        6: { code: '1011111', segments: [1, 0, 1, 1, 1, 1, 1], hex: '6' },
        7: { code: '1110000', segments: [1, 1, 1, 0, 0, 0, 0], hex: '7' },
        8: { code: '1111111', segments: [1, 1, 1, 1, 1, 1, 1], hex: '8' },
        9: { code: '1111011', segments: [1, 1, 1, 1, 0, 1, 1], hex: '9' },
        10: { code: '1110111', segments: [1, 1, 1, 0, 1, 1, 1], hex: 'A' },
        11: { code: '0011111', segments: [0, 0, 1, 1, 1, 1, 1], hex: 'B' },
        12: { code: '1001110', segments: [1, 0, 0, 1, 1, 1, 0], hex: 'C' },
        13: { code: '0111101', segments: [0, 1, 1, 1, 1, 0, 1], hex: 'D' },
        14: { code: '1001111', segments: [1, 0, 0, 1, 1, 1, 1], hex: 'E' },
        15: { code: '1000111', segments: [1, 0, 0, 0, 1, 1, 1], hex: 'F' }
    };

    // DOM Elements
    const tabBinary = document.getElementById('tab-binary');
    const tabHex = document.getElementById('tab-hex');
    const binaryGroup = document.getElementById('binary-inputs-group');
    const hexGroup = document.getElementById('hex-inputs-group');
    
    const checkboxes = [
        document.getElementById('pin-d3'), // MSB
        document.getElementById('pin-d2'),
        document.getElementById('pin-d1'),
        document.getElementById('pin-d0')  // LSB
    ];
    
    const bitValues = [
        document.getElementById('val-d3'),
        document.getElementById('val-d2'),
        document.getElementById('val-d1'),
        document.getElementById('val-d0')
    ];

    const hexKeys = document.querySelectorAll('.hex-key');
    const verilogLine = document.getElementById('verilog-line');
    
    // Display Output labels
    const lblBinary = document.getElementById('lbl-binary');
    const lblHex = document.getElementById('lbl-hex');
    const lblDecoder = document.getElementById('lbl-decoder');

    // Segment elements [a, b, c, d, e, f, g]
    const segments = [
        document.getElementById('seg-a'),
        document.getElementById('seg-b'),
        document.getElementById('seg-c'),
        document.getElementById('seg-d'),
        document.getElementById('seg-e'),
        document.getElementById('seg-f'),
        document.getElementById('seg-g')
    ];

    let currentDecimalValue = 0;

    // Toggle Input Modes
    tabBinary.addEventListener('click', () => {
        tabBinary.classList.add('active');
        tabHex.classList.remove('active');
        binaryGroup.classList.remove('d-none');
        hexGroup.classList.add('d-none');
        syncBinarySwitchesFromVal(currentDecimalValue);
    });

    tabHex.addEventListener('click', () => {
        tabHex.classList.add('active');
        tabBinary.classList.remove('active');
        binaryGroup.classList.add('d-none');
        hexGroup.classList.remove('d-none');
        syncHexKeyboardFromVal(currentDecimalValue);
    });

    // Switch handler for Binary Pins
    checkboxes.forEach((cb, index) => {
        cb.addEventListener('change', () => {
            // Update switch numeric labels (0 / 1)
            bitValues[index].textContent = cb.checked ? '1' : '0';
            if (cb.checked) {
                bitValues[index].classList.add('active-bit');
            } else {
                bitValues[index].classList.remove('active-bit');
            }
            
            // Calculate current decimal value from bits
            calculateValueFromSwitches();
        });
    });

    // Click handler for Hex Keys
    hexKeys.forEach(key => {
        key.addEventListener('click', () => {
            hexKeys.forEach(k => k.classList.remove('active'));
            key.classList.add('active');
            
            const hexChar = key.getAttribute('data-hex');
            const decVal = parseInt(hexChar, 16);
            currentDecimalValue = decVal;
            
            updateSimulatorDisplay(decVal);
        });
    });

    function calculateValueFromSwitches() {
        let val = 0;
        if (checkboxes[0].checked) val += 8; // D3
        if (checkboxes[1].checked) val += 4; // D2
        if (checkboxes[2].checked) val += 2; // D1
        if (checkboxes[3].checked) val += 1; // D0
        
        currentDecimalValue = val;
        updateSimulatorDisplay(val);
    }

    function syncBinarySwitchesFromVal(val) {
        checkboxes[0].checked = (val & 8) > 0;
        checkboxes[1].checked = (val & 4) > 0;
        checkboxes[2].checked = (val & 2) > 0;
        checkboxes[3].checked = (val & 1) > 0;
        
        checkboxes.forEach((cb, idx) => {
            bitValues[idx].textContent = cb.checked ? '1' : '0';
            if (cb.checked) {
                bitValues[idx].classList.add('active-bit');
            } else {
                bitValues[idx].classList.remove('active-bit');
            }
        });
    }

    function syncHexKeyboardFromVal(val) {
        const hexChar = val.toString(16).toUpperCase();
        hexKeys.forEach(key => {
            if (key.getAttribute('data-hex') === hexChar) {
                key.classList.add('active');
            } else {
                key.classList.remove('active');
            }
        });
    }

    function updateSimulatorDisplay(val) {
        const entry = segDecoderTable[val];
        
        // 1. Update text displays
        const binStr = val.toString(2).padStart(4, '0');
        lblBinary.textContent = binStr;
        lblHex.textContent = entry.hex;
        
        // Verilog display mapping is g-f-e-d-c-b-a
        // The table outputs g, f, e, d, c, b, a in segment index format
        // Let's print out the active decoder bits
        const activeSegments = entry.segments; // array [a, b, c, d, e, f, g]
        // Code box uses standard representation g-f-e-d-c-b-a:
        const verilogOutStr = `${activeSegments[6]}${activeSegments[5]}${activeSegments[4]}${activeSegments[3]}${activeSegments[2]}${activeSegments[1]}${activeSegments[0]}`;
        lblDecoder.textContent = verilogOutStr;

        // 2. Animate and Light up LED Segments
        // activeSegments mapping: index 0=a, 1=b, 2=c, 3=d, 4=e, 5=f, 6=g
        segments.forEach((segEl, idx) => {
            if (activeSegments[idx] === 1) {
                segEl.classList.add('lit');
            } else {
                segEl.classList.remove('lit');
            }
        });

        // Add standard DP lighting simulation for fractions/state
        const dp = document.getElementById('seg-dp');
        if (val % 2 === 0) {
            dp.classList.add('lit');
        } else {
            dp.classList.remove('lit');
        }

        // 3. Update Verilog active state display line
        if (verilogLine) {
            verilogLine.innerHTML = `4'h${entry.hex}: seg_out = 7'b${verilogOutStr}; <span class="v-comment">// Display ${entry.hex}</span>`;
        }
    }

    // Initialize display values to 0 on load
    updateSimulatorDisplay(0);


    // 6. Clipboard copy functionality
    const copyButtons = document.querySelectorAll('.btn-copy');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    showToast(`Copied: ${textToCopy}`, 'success');
                })
                .catch(() => {
                    showToast('Failed to copy text', 'info');
                });
        });
    });


    // 7. Toast Notifications System
    const toastContainer = document.getElementById('toast-container');

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let iconHtml = '<i data-lucide="info"></i>';
        if (type === 'success') {
            iconHtml = '<i data-lucide="check-circle"></i>';
        }
        
        toast.innerHTML = `
            ${iconHtml}
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        // Initialize dynamic lucide icon in toast
        if (typeof lucide !== 'undefined') {
            lucide.createIcons({
                attrs: { class: 'toast-icon' },
                nameAttr: 'data-lucide'
            });
        }

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.add('hide');
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 3000);
    }


    // 8. Contact Form submission logic
    const contactForm = document.getElementById('portfolio-contact-form');
    const submitBtn = document.getElementById('btn-submit');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show sending state
            submitBtn.disabled = true;
            const originalContent = submitBtn.innerHTML;
            submitBtn.innerHTML = `
                <span>Sending...</span>
                <i data-lucide="loader" class="animate-spin"></i>
            `;
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            // Simulate form submission delay
            setTimeout(() => {
                showToast('Message sent successfully! Thank you.', 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }, 1800);
        });
    }
});
