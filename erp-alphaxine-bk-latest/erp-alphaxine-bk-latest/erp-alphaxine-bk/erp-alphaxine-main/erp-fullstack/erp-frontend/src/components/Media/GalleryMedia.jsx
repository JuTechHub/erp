import React, { useState } from "react";

const mockImages = [
  {
    id: 1,
    url: "https://via.placeholder.com/80x80.png?text=Image+1",
    date: "2025-06-30",
    tag: "Profile",
    status: "active",
  },
  {
    id: 2,
    url: "https://via.placeholder.com/80x80.png?text=Image+2",
    date: "2025-06-29",
    tag: "Banner",
    status: "inactive",
  },
];

export default function GalleryMedia() {
  const [images, setImages] = useState(mockImages);

  const handleDelete = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Media Gallery</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Uploaded</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {images.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                  No images uploaded yet.
                </td>
              </tr>
            ) : (
              images.map((img) => (
                <tr key={img.id}>
                  <td className="px-6 py-4">
                    <img src={img.url} alt={img.tag} className="w-20 h-20 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4">{img.date}</td>
                  <td className="px-6 py-4">{img.tag}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${img.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{img.status === 'active' ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
