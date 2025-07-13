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
  if (cursor) {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"
  }
  if (cursorTrail) {
    setTimeout(() => {
      cursorTrail.style.left = e.clientX + "px"
      cursorTrail.style.top = e.clientY + "px"
    }, 100)
  }
})

// 3D Tilt Effect (Removed as it's not used in the new HTML structure for hero image)
// If you want to re-introduce a tilt effect on other elements, you'll need to add data-tilt attributes to them.
// const tiltElements = document.querySelectorAll("[data-tilt]")
// tiltElements.forEach((element) => {
//   element.addEventListener("mousemove", (e) => {
//     const rect = element.getBoundingClientRect()
//     const x = e.clientX - rect.left
//     const y = e.clientY - rect.top
//     const centerX = rect.width / 2
//     const centerY = rect.height / 2
//     const rotateX = (y - centerY) / 10
//     const rotateY = (centerX - x) / 10
//     element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
//   })
//   element.addEventListener("mouseleave", () => {
//     element.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
//   })
// })

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
        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 150 // Adjusted delay
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
document.querySelectorAll(".floating").forEach((icon) => {
  const delay = icon.getAttribute("data-delay") || "0"
  icon.style.animationDelay = delay + "s"
})

// Contact Form - Now simulates sending data
const contactForm = document.getElementById("contactForm")
const submitBtn = document.getElementById("submitBtn")

if (contactForm && submitBtn) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Add loading state
    submitBtn.classList.add("loading")
    submitBtn.disabled = true // Disable button during "loading"

    const formData = new FormData(contactForm)
    const data = Object.fromEntries(formData.entries())

    console.log("Simulating form submission with data:", data)

    // Simulate a delay for "network request"
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate success
    submitBtn.classList.remove("loading")
    submitBtn.classList.add("success")
    console.log("Form submitted successfully (simulated).")
    alert(
      "Message sent successfully! (This is a simulation. For actual email sending, you need a backend or a third-party service like Formspree.)",
    )

    // Reset form
    setTimeout(() => {
      contactForm.reset()
      submitBtn.classList.remove("success")
      submitBtn.disabled = false // Re-enable button
    }, 2000)

    // No actual fetch call here
  })
}

// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  const scrolled = window.pageYOffset

  if (navbar) {
    if (scrolled > 100) {
      navbar.style.background = "rgba(26, 26, 46, 0.98)"
      navbar.style.boxShadow = "0 2px 15px rgba(0, 0, 0, 0.3)"
    } else {
      navbar.style.background = "rgba(26, 26, 46, 0.95)"
      navbar.style.boxShadow = "none"
    }
  }
})

// Enhanced smooth scrolling with offset for fixed navbar
document.querySelectorAll(".nav-link, .footer-nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 0
      const targetPosition = targetSection.offsetTop - navbarHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })

      // Add active state to clicked nav link
      document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"))
      if (link.classList.contains("nav-link")) {
        link.classList.add("active")
      }
    }
  })
})

// Enhanced intersection observer for section highlighting
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute("id")
        const navLink = document.querySelector(`a[href="#${sectionId}"].nav-link`)

        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active")
        })

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

document.querySelectorAll("section[id]").forEach((section) => {
  sectionObserver.observe(section)
})

// Testimonials Slider
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

    this.showSlide(0)
    this.bindEvents()
    this.startAutoPlay()
  }

  bindEvents() {
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

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        if (!this.isTransitioning && index !== this.currentSlide) {
          this.goToSlide(index)
        }
      })
    })

    const slider = document.querySelector(".testimonials-slider")
    slider?.addEventListener("mouseenter", () => this.stopAutoPlay())
    slider?.addEventListener("mouseleave", () => this.startAutoPlay())

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

    this.slides.forEach((slide) => {
      slide.classList.remove("active")
    })

    this.dots.forEach((dot) => {
      dot.classList.remove("active")
    })

    if (this.slides[index]) {
      this.slides[index].classList.add("active")
    }

    if (this.dots[index]) {
      this.dots[index].classList.add("active")
    }

    this.currentSlide = index

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

  destroy() {
    this.stopAutoPlay()
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    window.testimonialsSlider = new TestimonialsSlider()
  }, 100)
})

window.addEventListener("resize", () => {
  if (window.testimonialsSlider) {
    window.testimonialsSlider.destroy()
    setTimeout(() => {
      window.testimonialsSlider = new TestimonialsSlider()
    }, 100)
  }
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
