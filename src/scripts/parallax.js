/**
 * Enable parallax effect.
 *
 * @param {Number} smoothMove The smoothness of parallax movement.
 *  The higher the value the movement becomes sharper.
 *  The lower the value the movement becomes smoother.
 */
const parallax = function ({ smoothMove = 1 }) {
  const root = document.documentElement;
  smoothMove /= 100;
  const touchSmoothMove = smoothMove * 3;

  const setCSSProperties = ({ x, y, smoothMove }) => {
    // calculate transformation values
    const rotateX = (y - window.innerHeight / 2) * smoothMove;
    const rotateY = ((x - window.innerWidth / 2) * -smoothMove) / 2;

    // set CSS variables
    root.style.setProperty('--rotate-x', `${rotateX}deg`);
    root.style.setProperty('--rotate-y', `${rotateY}deg`);
  };

  // desktop
  document.addEventListener('mousemove', (event) => {
    setCSSProperties({
      x: event.clientX,
      y: event.clientY,
      smoothMove,
    });
  });

  // mobile
  document.addEventListener('touchmove', (event) => {
    setCSSProperties({
      x: event.pageX,
      y: event.pageY,
      smoothMove: touchSmoothMove,
    });
  });

  const handleGyroscope = (event) => {
    if (event.gamma !== null && event.beta !== null) {
      const x = event.gamma; // Left to Right (-90 to 90)
      const y = event.beta; // Front to Back (-180 to 180)

      // Normalize values
      const normalizedX = ((x + 90) / 180) * window.innerWidth;
      const normalizedY = ((y + 90) / 180) * window.innerHeight;

      setCSSProperties({
        x: normalizedX,
        y: normalizedY,
        smoothMove: 0.03, // Adjust smoothness for mobile
      });
    }
  };

  const requestGyroscopePermission = () => {
    if (
      typeof DeviceMotionEvent !== 'undefined' &&
      typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
      // Show a permission prompt for iOS
      DeviceMotionEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleGyroscope);
          } else {
            console.warn('Gyroscope permission denied');
          }
        })
        .catch(console.error);
    } else {
      // For Android and other devices that do not require permission
      window.addEventListener('deviceorientation', handleGyroscope);
    }
  };
// Run permission request on page load
  window.addEventListener('click', () => {
    requestGyroscopePermission();
  });
};

module.exports = parallax;
