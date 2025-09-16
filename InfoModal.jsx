import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

/**
 * InfoModal displays detailed information about a processed millet product
 * alongside a bar chart of its nutritional composition. When visible is
 * false or there is no selected product, nothing is rendered. The
 * closeModal callback hides the modal when clicking outside the content or
 * pressing the close button.
 */
export default function InfoModal({ modalData, closeModal }) {
  const chartRef = useRef(null);

  useEffect(() => {
    // Only render the chart when there is a product selected and the modal
    // is visible.
    if (!modalData.visible || !modalData.product) return;
    const ctx = chartRef.current.getContext('2d');
    const { nutrients, name } = modalData.product;
    const data = {
      labels: ['Protein (g)', 'Fibre (g)', 'Minerals (g)', 'Iron (mg)', 'Calcium (mg)'],
      datasets: [
        {
          label: `${name} Nutritional Profile`,
          data: [
            nutrients.protein,
            nutrients.fiber,
            nutrients.minerals,
            nutrients.iron,
            nutrients.calcium,
          ],
        },
      ],
    };
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
    const chartInstance = new Chart(ctx, {
      type: 'bar',
      data,
      options,
    });
    return () => chartInstance.destroy();
  }, [modalData]);

  if (!modalData.visible || !modalData.product) {
    return null;
  }
  const { name, description } = modalData.product;
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>
          ×
        </button>
        <h2 className="modal-title">{name}</h2>
        <p className="modal-description">{description}</p>
        <div className="chart-wrapper">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
}