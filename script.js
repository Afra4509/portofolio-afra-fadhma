// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const navbar = document.getElementById('navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const themeToggle = document.querySelector('.theme-toggle');
  const header = document.getElementById('header');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const skillLevels = document.querySelectorAll('.skill-level');
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-link');
  const contactForm = document.getElementById('contactForm');

  // Check if dark mode is enabled in local storage
  if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-theme');
  }

  // Function to handle sticky navbar
  function handleScroll() {
      if (window.scrollY > 100) {
          header.classList.add('scrolled');
          scrollIndicator.style.opacity = '0';
      } else {
          header.classList.remove('scrolled');
          scrollIndicator.style.opacity = '1';
      }

      // Activate nav items based on scroll position
      let current = '';
      sections.forEach(section => {
          const sectionTop = section.offsetTop - 100;
          if (window.scrollY >= sectionTop) {
              current = section.getAttribute('id');
          }
      });

      navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href').slice(1) === current) {
              item.classList.add('active');
          }
      });

      // Animate skill bars when in view
      skillLevels.forEach(skill => {
          const skillSection = document.getElementById('skills');
          const sectionTop = skillSection.offsetTop;
          const sectionHeight = skillSection.offsetHeight;
          const windowHeight = window.innerHeight;
          
          if (window.scrollY > (sectionTop - windowHeight + 200) && window.scrollY < (sectionTop + sectionHeight)) {
              const level = skill.getAttribute('data-level');
              skill.style.width = `${level}%`;
          }
      });
  }

  // Mobile menu toggle
  menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('active');
      });
  });

  // Dark/Light theme toggle
  themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-theme');
      
      // Save preference to local storage
      if (document.body.classList.contains('dark-theme')) {
          localStorage.setItem('darkMode', 'enabled');
      } else {
          localStorage.setItem('darkMode', null);
      }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });

  // Handle form submission (can be expanded with actual form handling)
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const subject = document.getElementById('subject').value;
          const message = document.getElementById('message').value;
          
          // Display success message (in a real scenario you'd send this data to a server)
          const formData = {
              name,
              email,
              subject,
              message
          };
          
          console.log('Form submitted:', formData);
          
          // Reset form and show success message
          contactForm.reset();
          
          // Create success message
          const successMsg = document.createElement('div');
          successMsg.className = 'form-success';
          successMsg.innerText = 'Your message has been sent successfully!';
          
          // Add success message to the form
          contactForm.appendChild(successMsg);
          
          // Remove success message after 3 seconds
          setTimeout(() => {
              successMsg.remove();
          }, 3000);
      });
  }

  // Initial scroll handler call to set initial states
  handleScroll();

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Add scroll reveal animation
  const scrollElements = document.querySelectorAll('.scroll-reveal');
  
  const elementInView = (el, percentageScroll = 100) => {
      const elementTop = el.getBoundingClientRect().top;
      return (
          elementTop <= 
          ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
      );
  };
  
  const displayScrollElement = (element) => {
      element.classList.add('scrolled');
  };
  
  const hideScrollElement = (element) => {
      element.classList.remove('scrolled');
  };
  
  const handleScrollAnimation = () => {
      scrollElements.forEach((el) => {
          if (elementInView(el, 90)) {
              displayScrollElement(el);
          } else {
              hideScrollElement(el);
          }
      });
  };
  
  // Add scroll animation listener
  window.addEventListener('scroll', handleScrollAnimation);
  
  // Initial call for elements that are already in view when the page loads
  handleScrollAnimation();
});