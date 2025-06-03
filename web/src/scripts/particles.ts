// Particle effect with TypeScript types
document.addEventListener('DOMContentLoaded', () => {
  // Get canvas element with proper typing
  const canvas = document.getElementById('particles') as HTMLCanvasElement | null;
  if (!canvas) return;
  
  // Get 2D context with proper typing
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // Define particle type for better type safety
  interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
  }
  
  // Initialize canvas size
  const updateCanvasSize = () => {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  updateCanvasSize();
  
  // Create particles array with proper typing
  const particles: Particle[] = [];
  const particleCount = window.innerWidth < 768 ? 50 : 100;
  
  // Initialize particles
  const initializeParticles = (): Particle[] => {
    if (!canvas) return [];
    
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        color: `rgba(139, 92, 246, ${Math.random() * 0.3 + 0.1})`
      });
    }
    return newParticles;
  };
  
  // Initialize particles array
  const currentParticles = initializeParticles();
  
  // Animation loop
  const animate = () => {
    if (!ctx || !canvas) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    currentParticles.forEach(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });
    
    // Draw connections between nearby particles
    for (let i = 0; i < currentParticles.length; i++) {
      for (let j = i + 1; j < currentParticles.length; j++) {
        const dx = currentParticles[i].x - currentParticles[j].x;
        const dy = currentParticles[i].y - currentParticles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 - distance / 500})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(currentParticles[i].x, currentParticles[i].y);
          ctx.lineTo(currentParticles[j].x, currentParticles[j].y);
          ctx.stroke();
        }
      }
    }
    
    // Continue animation loop
    requestAnimationFrame(animate);
  };
  
  // Handle window resize
  const handleResize = () => {
    updateCanvasSize();
    // Reinitialize particles on resize
    const newParticles = initializeParticles();
    currentParticles.length = 0;
    currentParticles.push(...newParticles);
  };
  
  window.addEventListener('resize', handleResize);
  
  // Start animation
  animate();
  
  // Cleanup
  return () => {
    window.removeEventListener('resize', handleResize);
  };
});
