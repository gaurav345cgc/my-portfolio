// Particles Background
document.addEventListener("DOMContentLoaded", () => {
  // Initialize particles.js
  if (typeof particlesJS !== "undefined") {
    // Reduce particles on mobile for better performance
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    const particleCount = isSmallMobile ? 30 : isMobile ? 50 : 80;
    
    particlesJS("particles-js", {
      particles: {
        number: {
          value: particleCount,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#6c63ff",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#6c63ff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    })
  }

  // Custom cursor
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  // Fix for cursor delay
  const optimizeCursor = () => {
    const cursor = document.querySelector(".cursor")
    const cursorFollower = document.querySelector(".cursor-follower")

    if (!cursor || !cursorFollower) return

    // Use requestAnimationFrame for smoother cursor movement
    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Update cursor position immediately
      cursor.style.left = mouseX + "px"
      cursor.style.top = mouseY + "px"
    })

    function animateFollower() {
      // Calculate smoother follower movement
      followerX += (mouseX - followerX) * 0.2
      followerY += (mouseY - followerY) * 0.2

      cursorFollower.style.left = followerX + "px"
      cursorFollower.style.top = followerY + "px"

      requestAnimationFrame(animateFollower)
    }

    animateFollower()

    document.addEventListener("mousedown", () => {
      cursor.style.width = "8px"
      cursor.style.height = "8px"
      cursorFollower.style.width = "40px"
      cursorFollower.style.height = "40px"
    })

    document.addEventListener("mouseup", () => {
      cursor.style.width = "10px"
      cursor.style.height = "10px"
      cursorFollower.style.width = "30px"
      cursorFollower.style.height = "30px"
    })
  }

  // Typed text effect
  const typedTextSpan = document.querySelector(".typed-text")
  const cursorSpan = document.querySelector(".cursor")

  const textArray = ["AI Product Developer", "AI Engineer", "Full-Stack Architect", "LLM & RAG Specialist", "Problem Solver"]

  const typingDelay = 100
  const erasingDelay = 50
  const newTextDelay = 2000
  let textArrayIndex = 0
  let charIndex = 0

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (!cursorSpan.classList.contains("typing")) {
        cursorSpan.classList.add("typing")
      }
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex)
      charIndex++
      setTimeout(type, typingDelay)
    } else {
      cursorSpan.classList.remove("typing")
      setTimeout(erase, newTextDelay)
    }
  }

  function erase() {
    if (charIndex > 0) {
      if (!cursorSpan.classList.contains("typing")) {
        cursorSpan.classList.add("typing")
      }
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1)
      charIndex--
      setTimeout(erase, erasingDelay)
    } else {
      cursorSpan.classList.remove("typing")
      textArrayIndex++
      if (textArrayIndex >= textArray.length) {
        textArrayIndex = 0
      }
      setTimeout(type, typingDelay + 1100)
    }
  }

  if (textArray.length) {
    setTimeout(type, newTextDelay + 250)
  }

  // Fix skills section rendering - completely rewritten
  const initializeSkills = () => {
    const categories = document.querySelectorAll(".category")
    const skillsGroups = document.querySelectorAll(".skills-group")

    // Force display of frontend skills first
    if (skillsGroups.length > 0) {
      // Hide all groups first
      skillsGroups.forEach((group) => {
        group.style.display = "none"
        group.classList.remove("active")
      })

      // Show frontend group and activate its tab
      const frontendGroup = document.querySelector('.skills-group[data-group="frontend"]')
      const frontendTab = document.querySelector('.category[data-category="frontend"]')

      if (frontendGroup) {
        frontendGroup.style.display = "grid"
        frontendGroup.classList.add("active")
      }

      if (frontendTab) {
        categories.forEach((cat) => cat.classList.remove("active"))
        frontendTab.classList.add("active")
      }
    }

    // Add click handlers with direct DOM manipulation
    categories.forEach((category) => {
      category.addEventListener("click", function () {
        const categoryName = this.getAttribute("data-category")

        // Remove active class from all categories
        categories.forEach((cat) => cat.classList.remove("active"))

        // Add active class to clicked category
        this.classList.add("active")

        // Hide all skills groups with direct style manipulation
        skillsGroups.forEach((group) => {
          group.style.display = "none"
          group.classList.remove("active")
        })

        // Show the selected skills group with direct style manipulation
        const targetGroup = document.querySelector(`.skills-group[data-group="${categoryName}"]`)
        if (targetGroup) {
          targetGroup.style.display = "grid"
          targetGroup.classList.add("active")
        }
      })
    })
  }

  // Fix for the projects filter buttons not working
  const initializeProjects = () => {
    const filterBtns = document.querySelectorAll(".filter-btn")
    const projectCards = document.querySelectorAll(".project-card")

    // Make all projects visible by default
    projectCards.forEach((card) => {
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
      card.style.display = "flex"
    })

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const filter = this.getAttribute("data-filter")

        // Remove active class from all buttons
        filterBtns.forEach((btn) => btn.classList.remove("active"))

        // Add active class to clicked button
        this.classList.add("active")

        // Filter projects with minimal delay
        projectCards.forEach((card) => {
          const categories = card.getAttribute("data-category")

          if (filter === "all" || categories.includes(filter)) {
            card.style.display = "flex"
            setTimeout(() => {
              card.style.opacity = "1"
              card.style.transform = "translateY(0)"
            }, 10)
          } else {
            card.style.opacity = "0"
            card.style.transform = "translateY(20px)"
            setTimeout(() => {
              card.style.display = "none"
            }, 300)
          }
        })
      })
    })
  }

  // Initialize skills immediately
  initializeSkills()

  // Menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const hamburger = document.querySelector(".hamburger")
  const nav = document.querySelector("nav")

  menuToggle.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    nav.classList.toggle("active")
  })

  // Close menu when clicking on a link
  const navLinksMenu = document.querySelectorAll(".nav-link")
  navLinksMenu.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      nav.classList.remove("active")
    })
  })

  // Projects filter with immediate display
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  // Make all projects visible by default
  projectCards.forEach((card) => {
    card.style.opacity = "1"
    card.style.transform = "translateY(0)"
    card.style.display = "flex"
  })

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Filter projects with minimal delay
      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category")

        if (filter === "all" || categories.includes(filter)) {
          card.style.display = "flex"
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, 10)
        } else {
          card.style.opacity = "0"
          card.style.transform = "translateY(20px)"
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Preload project images
  const preloadImages = () => {
    const projectImages = document.querySelectorAll(".project-img img")
    projectImages.forEach((img) => {
      const src = img.getAttribute("src")
      if (src) {
        const preloadImg = new Image()
        preloadImg.src = src
      }
    })
  }

  preloadImages()

  // Form submission
  const contactForm = document.getElementById("contactForm")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    // Here you would typically send the form data to a server
    // For now, we'll just log it to the console
    console.log("Form submitted:", { name, email, subject, message })

    // Reset form
    contactForm.reset()

    // Show success message (you can implement a proper notification system)
    alert("Message sent successfully!")
  })

  // Scroll animations with GSAP
  let gsap // Declare gsap
  let ScrollTrigger // Declare ScrollTrigger
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap = window.gsap // Assign the global gsap object
    ScrollTrigger = window.ScrollTrigger // Assign the global ScrollTrigger object
    gsap.registerPlugin(ScrollTrigger)

    // Header scroll effect
    const header = document.querySelector("header")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })

    // GSAP Animations
    // Enhanced GSAP animations for projects with minimal delay
    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: ".projects-grid",
        start: "top 90%",
      },
      opacity: 0,
      y: 30,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      onComplete: () => {
        // Ensure all cards are visible after animation
        document.querySelectorAll(".project-card").forEach((card) => {
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        })
      },
    })

    // Enhanced hero animations
    gsap
      .timeline()
      .from(".hero-content h1", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: 0.2,
      })
      .from(
        ".hero-subtitle",
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
        },
        "-=0.3",
      )
      .from(
        ".hero-description",
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
        },
        "-=0.3",
      )
      .from(
        ".hero-cta",
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
        },
        "-=0.3",
      )
      .from(
        ".social-icons",
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
        },
        "-=0.3",
      )
      .from(
        ".orbit",
        {
          opacity: 0,
          scale: 0.5,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.3",
      )
      .from(
        ".planet",
        {
          opacity: 0,
          scale: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.5",
      )

    // Enhanced skill card animations with minimal delay
    gsap.from(".skill-card", {
      scrollTrigger: {
        trigger: ".skills-display",
        start: "top 90%",
      },
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.out",
      onComplete: () => {
        // Ensure all skill cards are visible after animation
        document.querySelectorAll(".skill-card").forEach((card) => {
          card.style.opacity = "1"
          card.style.transform = "translateY(0) scale(1)"
        })
      },
    })

    // Timeline items with minimal delay
    gsap.from(".timeline-item", {
      scrollTrigger: {
        trigger: ".timeline",
        start: "top 90%",
      },
      opacity: 0,
      y: 30,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    })

    // Contact cards with minimal delay
    gsap.from(".contact-card", {
      scrollTrigger: {
        trigger: ".contact-info",
        start: "top 90%",
      },
      opacity: 0,
      x: -20,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    })

    // Form animation with minimal delay
    gsap.from(".contact-form", {
      scrollTrigger: {
        trigger: ".contact-content",
        start: "top 90%",
      },
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: "power2.out",
    })

    // Add scroll-triggered animations for form elements
    gsap.from(".form-group", {
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 90%",
      },
      opacity: 0,
      y: 15,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.out",
    })
  }

  // Add back to top button functionality
  const backToTopButton = document.getElementById("back-to-top")

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("visible")
      } else {
        backToTopButton.classList.remove("visible")
      }
    })

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Add active class to nav links based on scroll position
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll("nav ul li a")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Call our new optimized functions
  initializeSkills()
  initializeProjects()
  optimizeCursor()

  // Force re-initialization after a slight delay to ensure DOM is fully processed
  setTimeout(() => {
    initializeSkills()
    initializeProjects()
  }, 500)
})

// Add this at the end of your DOMContentLoaded event to ensure it runs
document.addEventListener("DOMContentLoaded", () => {
  // Force skills initialization again after a slight delay to ensure DOM is fully processed
  setTimeout(initializeSkills, 100)
})

