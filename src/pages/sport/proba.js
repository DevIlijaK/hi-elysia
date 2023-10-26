        let isDragging = false;
        const donutContainer = document.getElementById('donut-container');
        const innerCircle = document.getElementById('inner-circle');

        innerCircle.addEventListener('mousedown', () => {
            isDragging = true;
        });

        donutContainer.addEventListener('mouseup', () => {
            isDragging = false;
        });

        donutContainer.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const x = e.clientX - donutContainer.getBoundingClientRect().left;
                const y = e.clientY - donutContainer.getBoundingClientRect().top;
                const distanceToCenter = Math.sqrt(Math.pow(x - 40, 2) + Math.pow(y - 40, 2));
                const innerCircleRadius = 10;

                if (distanceToCenter <= 20) {
                    // Change the inner circle color to red if the mouse is inside the inner circle.
                    innerCircle.style.backgroundColor = 'red';
                } else {
                    // Change the inner circle color to blue if the mouse is outside the inner circle.
                    innerCircle.style.backgroundColor = 'blue';
                }
            }
        });