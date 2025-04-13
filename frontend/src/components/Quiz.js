<div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 py-6">
  <div className="bg-[#0f172a] text-white rounded-xl shadow-xl w-full max-w-4xl flex flex-col overflow-hidden break-words">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      
      {/* LEFT SIDE - Image */}
      <div className="w-full h-full">
        <img 
          src={image} 
          alt="Quiz" 
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* RIGHT SIDE - Question and Options */}
      <div className="p-4 flex flex-col justify-center">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 break-words">
          {currentQuestion.question}
        </h3>

        <div className="space-y-4">
          {Object.entries(currentQuestion.options).map(([key, value]) => (
            <label
              key={key}
              className={`flex items-center gap-3 cursor-pointer p-3 rounded-md border transition-all duration-200 ${
                selectedOptions[currentQuestion._id] === key
                  ? "bg-green-600 border-green-500"
                  : "bg-gray-900 border-gray-700"
              }`}
            >
              <span className="font-bold text-green-400 text-lg">{key}</span>
              <input
                type="radio"
                name={`question-${currentQuestion._id}`}
                value={key}
                checked={selectedOptions[currentQuestion._id] === key}
                onChange={() => handleOptionChange(currentQuestion._id, key)}
                className="hidden"
              />
              <span>{value}</span>
            </label>
          ))}
        </div>
      </div>
    </div>

    {/* FOOTER NAVIGATION */}
    <div className="bg-black flex justify-between items-center px-6 py-4 text-sm sm:text-base">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="text-white font-medium disabled:opacity-50"
      >
        Previous
      </button>

      {currentPage < questions.length ? (
        <button
          onClick={nextPage}
          className="text-white font-medium"
        >
          Next
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className="text-white font-medium"
        >
          Submit
        </button>
      )}
    </div>
  </div>
</div>
