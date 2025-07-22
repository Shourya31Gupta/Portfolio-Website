import React, { useState } from "react";
import Modal from "react-modal";
import { achievementsData } from "../data/achievementsData";
import awardsBg from "../assets/awards-bg.png";

Modal.setAppElement("#root");

const Achievements = () => {
  const [selected, setSelected] = useState(null);
  const [gallery, setGallery] = useState([]);

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
  };

  const closeModal = () => {
    setSelected(null);
    setGallery([]);
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
              className="cursor-pointer bg-white/10 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105"
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto flex items-center justify-center px-4 py-10">
          <div className="bg-gray-900 rounded-xl p-6 max-w-5xl w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-white text-2xl"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-white mb-2">{selected.title}</h3>
            <p className="text-gray-300 mb-4">{selected.competition}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-60 object-contain rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Achievements;
