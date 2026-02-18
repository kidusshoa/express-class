import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://localhost:4000'

function App() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ title: '', file: null })

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch(`${API_URL}/images`)
      const data = await response.json()
      setImages(data)
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      alert('Title is required')
      return
    }

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      if (formData.file) {
        formDataToSend.append('file', formData.file)
      }

      if (editingId) {
        // Update
        const response = await fetch(`${API_URL}/images/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: formData.title }),
        })
        if (response.ok) {
          await fetchImages()
          resetForm()
        }
      } else {
        // Create
        const response = await fetch(`${API_URL}/images`, {
          method: 'POST',
          body: formDataToSend,
        })
        if (response.ok) {
          await fetchImages()
          resetForm()
        }
      }
    } catch (error) {
      console.error('Error saving image:', error)
      alert('Error saving image')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const response = await fetch(`${API_URL}/images/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        await fetchImages()
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      alert('Error deleting image')
    }
  }

  const handleEdit = (image) => {
    setEditingId(image.id)
    setFormData({ title: image.title, file: null })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({ title: '', file: null })
    setEditingId(null)
    setShowForm(false)
  }

  if (loading) {
    return <div className="loading">Loading images...</div>
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Image Album</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
          {showForm ? 'Cancel' : 'Add Image'}
        </button>
      </header>

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <h2>{editingId ? 'Edit Image' : 'Add New Image'}</h2>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="Enter image title"
              />
            </div>
            {!editingId && (
              <div className="form-group">
                <label htmlFor="file">Image File:</label>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
                />
              </div>
            )}
            <div className="form-actions">
              <button type="submit" className="btn btn-success">
                {editingId ? 'Update' : 'Upload'}
              </button>
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="images-grid">
        {images.length === 0 ? (
          <div className="empty-state">
            <p>No images yet. Add your first image!</p>
          </div>
        ) : (
          images.map((image) => (
            <div key={image.id} className="image-card">
              {image.url ? (
                <img src={image.url} alt={image.title} className="image-preview" />
              ) : (
                <div className="image-placeholder">No Image</div>
              )}
              <div className="image-info">
                <h3>{image.title}</h3>
                {image.originalName && <p className="filename">{image.originalName}</p>}
                <p className="date">
                  {new Date(image.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="image-actions">
                <button
                  onClick={() => handleEdit(image)}
                  className="btn btn-small btn-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="btn btn-small btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
