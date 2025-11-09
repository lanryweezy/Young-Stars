import React, { useRef, useEffect } from 'react';

const AnimatedBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        const mouse = {
            x: width / 2,
            y: height / 2,
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        type Star = {
            x: number;
            y: number;
            z: number;
            xProjected: number;
            yProjected: number;
            scaleProjected: number;
        };

        const numStars = 500;
        const stars: Star[] = [];
        const fov = 150;

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: (Math.random() - 0.5) * width * 2,
                y: (Math.random() - 0.5) * height * 2,
                z: Math.random() * width,
                xProjected: 0,
                yProjected: 0,
                scaleProjected: 0,
            });
        }

        let animationFrameId: number;
        
        const render = () => {
            ctx.clearRect(0, 0, width, height);

            const mouseXFactor = (mouse.x - width / 2) * 0.2;
            const mouseYFactor = (mouse.y - height / 2) * 0.2;
            
            stars.forEach(star => {
                star.z -= 1;
                if (star.z <= 0) {
                    star.x = (Math.random() - 0.5) * width * 2;
                    star.y = (Math.random() - 0.5) * height * 2;
                    star.z = width;
                }
                
                const perspective = fov / (fov + star.z);
                star.xProjected = (star.x - mouseXFactor) * perspective + width / 2;
                star.yProjected = (star.y - mouseYFactor) * perspective + height / 2;
                star.scaleProjected = perspective * 2;
                
                if (star.xProjected > 0 && star.xProjected < width && star.yProjected > 0 && star.yProjected < height) {
                    ctx.beginPath();
                    ctx.arc(star.xProjected, star.yProjected, star.scaleProjected, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(110, 231, 183, ${perspective * 0.7})`;
                    ctx.fill();
                }
            });
            
            animationFrameId = window.requestAnimationFrame(render);
        };
        
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <canvas id="cosmos-bg" ref={canvasRef} />;
};

export default AnimatedBackground;