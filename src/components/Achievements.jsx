import React, { useState } from "react";
import Modal from "react-modal";
import { achievementsData } from "../data/achievementsData";
import awardsBg from "../assets/awards-bg.png";

Modal.setAppElement("#root");

const Achievements = () => {
  const [selected, setSelected] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [enlargedImageIndex, setEnlargedImageIndex] = useState(null);

  const openModal = async (achievement) => {
    const images = [];
    try {
      for (let i = 1; i <= 3; i++) {
        const img = await import(`../assets/${achievement.folder}/img${i}.jpg`);
        images.push(img.default);
      }
    } catch (error) {
      console.warn("Some gallery images might be missing:", error);
    }
    setSelected(achievement);
    setGallery(images);
    setEnlargedImageIndex(null);
  };

  const closeModal = () => {
    setSelected(null);
    setGallery([]);
    setEnlargedImageIndex(null);
  };

  const toggleImageSize = (imageIndex) => {
    setEnlargedImageIndex(enlargedImageIndex === imageIndex ? null : imageIndex);
  };

  return (
    <section id="achievements" className="relative w-full min-h-screen py-16 px-6 text-white overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <img src={awardsBg} alt="Background" className="w-full h-full object-cover opacity-70 blur-[5px]" />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
            Celebrating milestones and accomplishments in my academic and professional journey.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {achievementsData.map((achievement, index) => (
            <div key={index} onClick={() => openModal(achievement)} className="cursor-pointer bg-white/10 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="relative group">
                <img src={achievement.image} alt={achievement.title} className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 px-4 py-2">
                  <h3 className="text-lg font-semibold text-white">{achievement.title}</h3>
                  <p className="text-sm text-gray-300">{achievement.competition}</p>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                    <div className="text-2xl mb-2">🔍</div>
                    <div className="text-sm">Click to view gallery</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/90 z-40 overflow-y-auto flex items-center justify-center px-4 py-10">
          <div className="bg-gray-900 rounded-xl p-6 max-w-6xl w-full relative">
            <button onClick={closeModal} className="absolute top-3 right-4 text-white text-2xl hover:text-red-400 transition-colors duration-200 z-10">&times;</button>
            <h3 className="text-2xl font-bold text-white mb-2">{selected.title}</h3>
            <p className="text-gray-300 mb-4">{selected.competition}</p>

            {/* Show zoomed image in center when an image is clicked */}
            {enlargedImageIndex !== null ? (
              <div className="flex flex-col items-center">
                <div className="text-center mb-4">
                  <p className="text-blue-400 text-sm">💡 Click the image to return to gallery</p>
                </div>
                <div className="relative max-w-4xl w-full">
                  <img
                    src={gallery[enlargedImageIndex]}
                    alt={`Zoomed view - Image ${enlargedImageIndex + 1}`}
                    className="w-full max-h-[70vh] object-contain rounded-lg cursor-pointer transition-all duration-300 hover:scale-105"
                    onClick={() => setEnlargedImageIndex(null)}
                  />
                </div>
              </div>
            ) : (
              /* Show 3-image grid when no image is zoomed */
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <p className="text-blue-400 text-sm">💡 Click any image to zoom it in the center!</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {gallery.map((img, idx) => (
                    <div key={idx} className="transition-all duration-300 ease-in-out">
                      <img
                        src={img}
                        alt={`Gallery ${idx + 1}`}
                        onClick={() => toggleImageSize(idx)}
                        className="w-full h-60 object-cover rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Enlarged Image Overlay - Comes Over the Popup */}
      {enlargedImageIndex !== null && selected && (
        <div className="fixed inset-0 bg-black/80 z-[45] flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={gallery[enlargedImageIndex]}
              alt={`Enlarged view - Image ${enlargedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={() => setEnlargedImageIndex(null)}
            />
            <button
              onClick={() => setEnlargedImageIndex(null)}
              className="absolute top-2 right-2 text-white text-2xl hover:text-red-400 transition-colors duration-200 bg-black/50 rounded-full w-8 h-8 flex items-center justify-center"
            >
              &times;
            </button>
            <div className="absolute bottom-2 left-2 text-white text-sm bg-black/50 px-2 py-1 rounded">
              Click image to close
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Achievements;
