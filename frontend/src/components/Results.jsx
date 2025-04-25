import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const Results = () => {
  const { checkupId } = useParams();
  const [checkupData, setCheckupData] = useState(null);

  useEffect(() => {
    // Fetch checkup results from the backend using checkupId
    axios.get(`http://localhost:5000/api/checkup/results/${checkupId}`)
      .then(response => {
        setCheckupData(response.data);
      })
      .catch(error => {
        console.error('Error fetching checkup data:', error);
      });
  }, [checkupId]);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text('Checkup Results', 14, 20);

    // Dentist Notes
    doc.setFontSize(12);
    doc.text('Dentist Notes:', 14, 30);
    doc.text(checkupData.dentistNotes, 14, 40);

    // Add images if they exist
    checkupData.images.forEach((image, index) => {
      // Fetch image as base64
      const imageUrl = `http://localhost:5000${image.url}`;
      fetch(imageUrl)
        .then(res => res.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result;
            doc.addImage(base64data, 'JPEG', 14, 50 + (index * 40), 180, 100);
            if (index === checkupData.images.length - 1) {
              // Save PDF after all images are loaded
              doc.save('checkup_results.pdf');
            }
          };
          reader.readAsDataURL(blob);
        });
    });
  };

  if (!checkupData) return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold text-teal-600 mb-6">Checkup Results</h2>
      <p><strong>Dentist Notes:</strong> {checkupData.dentistNotes}</p>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Images:</h3>
        <div className="flex flex-wrap gap-4">
          {checkupData.images.map((image, index) => (
            <img key={index} src={`http://localhost:5000${image.url}`} alt={`Checkup Image ${index + 1}`} className="w-64 h-48 object-cover" />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <button 
          onClick={generatePDF} 
          className="py-2 px-6 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700"
        >
          Export to PDF
        </button>
      </div>
    </div>
  );
};

export default Results;
