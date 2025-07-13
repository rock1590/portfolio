// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const mobileMenu = document.querySelector(".nav-menu")
const navLinks = document.querySelectorAll(".nav-link")

if (mobileMenuToggle && mobileMenu) {
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle("active")
    mobileMenu.classList.toggle("active")
    document.body.classList.toggle("menu-open")
  })

  // Close menu when clicking on nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuToggle.classList.remove("active")
      mobileMenu.classList.remove("active")
      document.body.classList.remove("menu-open")
    })
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenuToggle.classList.remove("active")
      mobileMenu.classList.remove("active")
      document.body.classList.remove("menu-open")
    }
  })
}

// Prevent body scroll when mobile menu is open
const style = document.createElement("style")
style.textContent = `
  body.menu-open {
    overflow: hidden;
  }
`
document.head.appendChild(style)

// Custom Cursor
const cursor = document.querySelector(".cursor")
const cursorTrail = document.querySelector(".cursor-trail")

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px"
  cursor.style.top = e.clientY + "px"

  setTimeout(() => {
    cursorTrail.style.left = e.clientX + "px"
    cursorTrail.style.top = e.clientY + "px"
  }, 100)
})

// 3D Tilt Effect
const tiltElements = document.querySelectorAll("[data-tilt]")

tiltElements.forEach((element) => {
  element.addEventListener("mousemove", (e) => {
    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
  })

  element.addEventListener("mouseleave", () => {
    element.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
  })
})

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")

      // Animate progress bars
      if (entry.target.classList.contains("progress-fill")) {
        const width = entry.target.getAttribute("data-width")
        setTimeout(() => {
          entry.target.style.width = width + "%"
        }, 200)
      }

      // Animate timeline items
      if (entry.target.classList.contains("timeline-item")) {
        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200
        setTimeout(() => {
          entry.target.classList.add("animate")
        }, delay)
      }
    }
  })
}, observerOptions)

// Observe elements
document.querySelectorAll(".fade-in, .timeline-item, .progress-fill").forEach((el) => {
  observer.observe(el)
})

// Floating Icons Animation
document.querySelectorAll(".floating").forEach((icon, index) => {
  const delay = icon.getAttribute("data-delay") || 0
  icon.style.animationDelay = delay + "s"
})

// Particle System
function createParticle() {
  const particle = document.createElement("div")
  particle.classList.add("particle")

  const size = Math.random() * 5 + 2
  particle.style.width = size + "px"
  particle.style.height = size + "px"
  particle.style.left = Math.random() * 100 + "%"

  document.querySelector(".particles").appendChild(particle)

  setTimeout(() => {
    particle.remove()
  }, 15000)
}

// Create particles periodically
setInterval(createParticle, 300)

// Smooth Scrolling for Navigation Links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Project Modal
const modal = document.getElementById("projectModal")
const projectCards = document.querySelectorAll(".project-card")
const closeModal = document.querySelector(".close-modal")

const projectData = {
  1: {
    title: "E-Commerce WordPress Site",
    description:
      "Custom WooCommerce store with advanced product filtering, payment gateway integration, and responsive design for a fashion retailer.",
    image: "/placeholder.svg?height=300&width=500",
    tech: ["WordPress", "WooCommerce", "PHP", "MySQL"],
    demo: "#",
    code: "#",
  },
  2: {
    title: "Corporate WordPress Theme",
    description:
      "Custom WordPress theme for a consulting firm with advanced custom post types, ACF integration, and modern design.",
    image: "/placeholder.svg?height=300&width=500",
    tech: ["WordPress", "PHP", "ACF", "SCSS"],
    demo: "#",
    code: "#",
  },
  3: {
    title: "Restaurant WordPress Site",
    description:
      "WordPress website for a restaurant chain with online ordering system, location finder, and menu management.",
    image: "/placeholder.svg?height=300&width=500",
    tech: ["WordPress", "Custom Plugins", "API Integration"],
    demo: "#",
    code: "#",
  },
  4: {
    title: "Portfolio WordPress Theme",
    description:
      "Creative portfolio theme for photographers and artists with gallery management and client proofing system.",
    image: "/placeholder.svg?height=300&width=500",
    tech: ["WordPress", "JavaScript", "CSS Grid", "PHP"],
    demo: "#",
    code: "#",
  },
}

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const projectId = card.getAttribute("data-project")
    const project = projectData[projectId]

    if (project) {
      document.querySelector(".modal-title").textContent = project.title
      document.querySelector(".modal-description").textContent = project.description
      document.querySelector(".modal-image").src = project.image

      const techContainer = document.querySelector(".modal-tech")
      techContainer.innerHTML = ""
      project.tech.forEach((tech) => {
        const tag = document.createElement("span")
        tag.classList.add("tech-tag")
        tag.textContent = tech
        techContainer.appendChild(tag)
      })

      const links = document.querySelectorAll(".modal-link")
      links[0].href = project.demo
      links[1].href = project.code

      modal.style.display = "block"
      document.body.style.overflow = "hidden"
    }
  })
})

closeModal.addEventListener("click", () => {
  modal.style.display = "none"
  document.body.style.overflow = "auto"
})

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  }
})

// Contact Form
const contactForm = document.getElementById("contactForm")
const submitBtn = document.getElementById("submitBtn")

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  // Add loading state
  submitBtn.classList.add("loading")

  // Simulate form submission
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Show success state
  submitBtn.classList.remove("loading")
  submitBtn.classList.add("success")

  // Reset form
  setTimeout(() => {
    contactForm.reset()
    submitBtn.classList.remove("success")
  }, 2000)
})

// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Timeline Scroll Animation
const timeline = document.querySelector(".timeline")
const timelineContainer = document.querySelector(".timeline-container")

if (timeline && timelineContainer) {
  timelineContainer.addEventListener("scroll", () => {
    const items = document.querySelectorAll(".timeline-item")
    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect()
      const containerRect = timelineContainer.getBoundingClientRect()

      if (rect.left < containerRect.right && rect.right > containerRect.left) {
        setTimeout(() => {
          item.classList.add("animate")
        }, index * 100)
      }
    })
  })
}

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".hero-content")

  parallaxElements.forEach((element) => {
    const speed = 0.5
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", () => {
  // Trigger initial animations
  setTimeout(() => {
    document.querySelectorAll(".fade-in").forEach((el, index) => {
      setTimeout(() => {
        el.style.animationDelay = index * 0.1 + "s"
        el.classList.add("animate")
      }, index * 100)
    })
  }, 500)
})

// Add hover effects to interactive elements
document.querySelectorAll("button, .nav-link, .social-icon").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(1.5)"
  })

  element.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)"
  })
})

// Glitch text effect trigger
const glitchText = document.querySelector(".glitch-text")
if (glitchText) {
  setInterval(() => {
    glitchText.style.animation = "none"
    setTimeout(() => {
      glitchText.style.animation = "glitch 2s infinite"
    }, 100)
  }, 5000)
}

// Testimonials Slider - Fixed Implementation
class TestimonialsSlider {
  constructor() {
    this.currentSlide = 0
    this.slides = document.querySelectorAll(".testimonial-card")
    this.dots = document.querySelectorAll(".dot")
    this.prevBtn = document.querySelector(".prev-btn")
    this.nextBtn = document.querySelector(".next-btn")
    this.autoPlayInterval = null
    this.isTransitioning = false

    this.init()
  }

  init() {
    if (this.slides.length === 0) return

    // Initialize first slide
    this.showSlide(0)
    this.bindEvents()
    this.startAutoPlay()
  }

  bindEvents() {
    // Navigation buttons
    this.prevBtn?.addEventListener("click", () => {
      if (!this.isTransitioning) {
        this.prevSlide()
      }
    })

    this.nextBtn?.addEventListener("click", () => {
      if (!this.isTransitioning) {
        this.nextSlide()
      }
    })

    // Dots navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        if (!this.isTransitioning && index !== this.currentSlide) {
          this.goToSlide(index)
        }
      })
    })

    // Pause autoplay on hover
    const slider = document.querySelector(".testimonials-slider")
    slider?.addEventListener("mouseenter", () => this.stopAutoPlay())
    slider?.addEventListener("mouseleave", () => this.startAutoPlay())

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" && !this.isTransitioning) {
        this.prevSlide()
      } else if (e.key === "ArrowRight" && !this.isTransitioning) {
        this.nextSlide()
      }
    })
  }

  showSlide(index) {
    this.isTransitioning = true

    // Remove active class from all slides and dots
    this.slides.forEach((slide) => {
      slide.classList.remove("active")
    })

    this.dots.forEach((dot) => {
      dot.classList.remove("active")
    })

    // Add active class to current slide and dot
    if (this.slides[index]) {
      this.slides[index].classList.add("active")
    }

    if (this.dots[index]) {
      this.dots[index].classList.add("active")
    }

    this.currentSlide = index

    // Reset transition flag after animation completes
    setTimeout(() => {
      this.isTransitioning = false
    }, 500)
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length
    this.goToSlide(nextIndex)
  }

  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    this.goToSlide(prevIndex)
  }

  goToSlide(index) {
    if (index >= 0 && index < this.slides.length && index !== this.currentSlide) {
      this.showSlide(index)
    }
  }

  startAutoPlay() {
    this.stopAutoPlay()
    this.autoPlayInterval = setInterval(() => {
      if (!this.isTransitioning) {
        this.nextSlide()
      }
    }, 5000)
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval)
      this.autoPlayInterval = null
    }
  }

  // Public method to destroy slider
  destroy() {
    this.stopAutoPlay()
    // Remove event listeners if needed
  }
}

// Initialize testimonials slider when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Wait a bit for CSS to load
  setTimeout(() => {
    window.testimonialsSlider = new TestimonialsSlider()
  }, 100)
})

// Enhanced responsive handling for testimonials
window.addEventListener("resize", () => {
  if (window.testimonialsSlider) {
    // Reinitialize slider on resize to handle responsive changes
    window.testimonialsSlider.destroy()
    setTimeout(() => {
      window.testimonialsSlider = new TestimonialsSlider()
    }, 100)
  }
})

// Enhanced navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  const scrolled = window.pageYOffset

  if (scrolled > 100) {
    navbar.style.background = "rgba(0, 0, 0, 0.95)"
    navbar.style.boxShadow = "0 2px 20px rgba(99, 102, 241, 0.3)"
    navbar.style.borderBottom = "1px solid rgba(99, 102, 241, 0.3)"
  } else {
    navbar.style.background = "rgba(0, 0, 0, 0.9)"
    navbar.style.boxShadow = "none"
    navbar.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)"
  }
})

// Enhanced smooth scrolling with offset for fixed navbar
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight
      const targetPosition = targetSection.offsetTop - navbarHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })

      // Add active state to clicked nav link
      document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"))
      link.classList.add("active")
    }
  })
})

// Enhanced intersection observer for section highlighting
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute("id")
        const navLink = document.querySelector(`a[href="#${sectionId}"]`)

        // Remove active class from all nav links
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active")
        })

        // Add active class to current section's nav link
        if (navLink) {
          navLink.classList.add("active")
        }
      }
    })
  },
  {
    threshold: 0.3,
    rootMargin: "-100px 0px -100px 0px",
  },
)

// Observe all sections
document.querySelectorAll("section[id]").forEach((section) => {
  sectionObserver.observe(section)
})

// Touch support for project cards on mobile
if ("ontouchstart" in window) {
  document.querySelectorAll(".project-card").forEach((card) => {
    let touchStartTime = 0

    card.addEventListener("touchstart", () => {
      touchStartTime = Date.now()
    })

    card.addEventListener("touchend", (e) => {
      const touchDuration = Date.now() - touchStartTime
      if (touchDuration < 500) {
        // Quick tap
        const overlay = card.querySelector(".project-overlay")
        if (overlay) {
          overlay.style.opacity = overlay.style.opacity === "1" ? "0" : "1"
        }
      }
    })
  })
}
