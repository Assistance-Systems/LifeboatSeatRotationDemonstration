<script>
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    const slider = document.querySelector("#slider");
    const angleElement = document.querySelector("#angle");
    const matrixElements = document.querySelectorAll("#matrix td");

    let measuredData = { x: [], y: [], z: [] };
    let transformedData = { x: [], y: [], z: [] };

    const chartX = new Chart(document.getElementById('chart-x'), {
      type: 'line',
      data: { labels: Array(100).fill(''), datasets: [
        { label: 'Measured', data: [], borderColor: 'red' },
        { label: 'Transformed', data: [], borderColor: 'blue' },
      ]}
    });
    // Similarly initialize charts for Y and Z

    function drawSeat(angle) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((Math.PI / 180) * angle);
      ctx.beginPath();
      ctx.moveTo(-50, 0);
      ctx.lineTo(50, 0);
      ctx.quadraticCurveTo(50, -50, 0, -100);
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#000";
      ctx.stroke();
      ctx.restore();
    }

    function updateMatrix(angle) {
      const rad = (Math.PI / 180) * angle;
      const cos = Math.cos(rad).toFixed(2);
      const sin = Math.sin(rad).toFixed(2);

      matrixElements[0].textContent = cos;
      matrixElements[1].textContent = "0";
      matrixElements[2].textContent = (-sin).toString();
      matrixElements[3].textContent = "0";
      matrixElements[4].textContent = "1";
      matrixElements[5].textContent = "0";
      matrixElements[6].textContent = sin;
      matrixElements[7].textContent = "0";
      matrixElements[8].textContent = cos;

      return [[cos, 0, -sin], [0, 1, 0], [sin, 0, cos]];
    }

    function generateData(matrix) {
      const newValue = { x: Math.random() * 4 - 2, y: Math.random() * 4 - 2, z: Math.random() * 4 - 2 };

      measuredData.x.push(newValue.x);
      measuredData.y.push(newValue.y);
      measuredData.z.push(newValue.z);

      const transformed = matrix.map((row) => row[0]*newValue.x + row[1]*newValue.y + row[2]*newValue.z);

      transformedData.x.push(transformed[0]);
      transformedData.y.push(transformed[1]);
      transformedData.z.push(transformed[2]);

      chartX.data.datasets[0].data = measuredData.x;
      chartX.data.datasets[1].data = transformedData.x;
      chartX.update();
      // Similarly update charts for Y and Z
    }

    function updateAngle(angle) {
      angleElement.textContent = `Seat Angle: ${angle}°`;
    }

    function update() {
      const angle = slider.value;
      drawSeat(angle);
      const matrix = updateMatrix(angle);
      generateData(matrix);
      updateAngle(angle);
    }

    slider.addEventListener("input", update);
    setInterval(update, 500);  // Update every 500ms
</script>
