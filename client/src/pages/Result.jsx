import { useLocation, Navigate } from "react-router-dom";
import { FiDownload } from "react-icons/fi";

function Result() {
  const location = useLocation();
  const resultData = location.state?.result;

  // If no result data is passed, redirect to the diagnosis page
  if (!resultData) {
    return <Navigate to="/diagnosis" replace />;
  }
  
  const {
    disease,
    confidence,
    description,
    precautions,
    medicines,
    diet,
    doctor,
  } = resultData;

  const confidencePercentage = (confidence * 100).toFixed(2);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Side: Diagnosis and Confidence */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Diagnosis Result</h1>
              <p className="text-lg text-indigo-600 font-semibold mb-4">{disease}</p>
              
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                      Confidence
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-indigo-600">
                      {confidencePercentage}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                  <div style={{ width: `${confidencePercentage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-3">Description</h2>
                <p className="text-gray-600 text-sm">{description}</p>
              </div>

               <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-3">Consult a Doctor</h2>
                <p className="text-gray-600 text-sm">It's recommended to consult with a <span className="font-bold text-indigo-600">{doctor}</span> for a precise diagnosis and treatment.</p>
              </div>
            </div>
             <div className="mt-6 text-center">
                <button className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out flex items-center justify-center w-full shadow-md">
                  <FiDownload className="mr-2" />
                  Download Report
                </button>
              </div>
          </div>

          {/* Right Side: Details */}
          <div className="lg:w-2/3">
            <div className="bg-white p-6 rounded-xl shadow-md">
              
              {/* Precautions */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-3">Precautions</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
                  {precautions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Medicines */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-3">Recommended Medicines</h2>
                 <p className="text-xs text-red-500 mb-2">*For educational purposes only. Always consult a doctor.</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
                  {medicines.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Diet */}
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-3">Diet Suggestions</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
                  {diet.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
