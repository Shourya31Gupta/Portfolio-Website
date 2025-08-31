import React, { useState } from "react";
import Modal from "react-modal";
import { achievementsData } from "../data/achievementsData";
import awardsBg from "../assets/awards-bg.png";

Modal.setAppElement("#root");

const Achievements = () => {
  const [selected, setSelected] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [zoomedImages, setZoomedImages] = useState({});

  const openModal = async (achievement) => {
    console.log("🎯 Opening modal for:", achievement.title);
    const images = [];

    try {
      for (let i = 1; i <= 3; i++) {
        const img = await import(`../assets/${achievement.folder}/img${i}.jpg`);
        images.push(img.default);
      }
      console.log("📸 Loaded images:", images.length, "images");
    } catch (error) {
      console.warn("⚠️ Some gallery images might be missing:", error);
    }

    setSelected(achievement);
    setGallery(images);
    setZoomedImages({}); // Reset zoom levels
  };

  const closeModal = () => {
    console.log("❌ Closing modal");
    setSelected(null);
    setGallery([]);
    setZoomedImages({});
  };

  const toggleImageZoom = (imageIndex) => {
    console.log("🖱️ Toggling zoom for image:", imageIndex);
    setZoomedImages(prev => ({
      ...prev,
      [imageIndex]: !prev[imageIndex]
    }));
  };

  const getZoomLevel = (imageIndex) => {
    return zoomedImages[imageIndex] ? 2.5 : 1; // 1 = normal, 2.5 = zoomed
  };

  return (
    <section id="achievements" className="relative w-full min-h-screen py-16 px-6 text-white overflow-hidden bg-black">
      {/* ✅ Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={awardsBg}
          alt="Background"
          className="w-full h-full object-cover opacity-70 blur-[5px]"
        />
      </div>

      {/* ✅ Content Wrapper above background */}
      <div className="relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12">Achievements</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {achievementsData.map((achievement, index) => (
            <div
              key={index}
              onClick={() => openModal(achievement)}
              className="cursor-pointer bg-white/10 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              <div className="relative group">
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
                />
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

      {/* ✅ Enhanced Modal with Progressive Zoom */}
      {selected && (
        <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto flex items-center justify-center px-4 py-10">
          <div className="bg-gray-900 rounded-xl p-6 max-w-6xl w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-white text-2xl hover:text-red-400 transition-colors duration-200 z-10"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-white mb-2">{selected.title}</h3>
            <p className="text-gray-300 mb-4">{selected.competition}</p>
            <p className="text-blue-400 text-sm mb-4">💡 Click on any image to zoom in/out within the modal!</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((img, idx) => (
                <div key={idx} className="relative group overflow-hidden rounded-lg">
                  <div 
                    className="transition-all duration-300 ease-in-out cursor-pointer"
                    style={{
                      transform: `scale(${getZoomLevel(idx)})`,
                      transformOrigin: 'center'
                    }}
                    onClick={() => toggleImageZoom(idx)}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-60 object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Zoom Indicator */}
                  <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {zoomedImages[idx] ? '🔍 Zoomed' : '🔍 Click to zoom'}
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center pointer-events-none">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-center">
                      <div className="text-xl mb-1">🔍</div>
                      <div className="text-xs font-semibold">
                        {zoomedImages[idx] ? 'Click to zoom out' : 'Click to zoom in'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Zoom Instructions */}
            <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
              <h4 className="text-blue-300 font-semibold mb-2">🎯 How to Use Zoom:</h4>
              <ul className="text-blue-200 text-sm space-y-1">
                <li>• <strong>Click once</strong> on any image to zoom in</li>
                <li>• <strong>Click again</strong> to zoom out</li>
                <li>• Zoom happens within the modal (no full-page zoom)</li>
                <li>• Each image can be zoomed independently</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Achievements;
