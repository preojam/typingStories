
import React, { useState, useEffect } from 'react';
import { fetchAllGenres } from '../api/genreService';
import { createStory, fetchStoryById, updateStory } from '../api/storyService';
import { useNavigate, useParams } from 'react-router-dom';
import CoverDropzone from '../components/CoverDropZone';
import '../App.css';

export default function CreateStory() {
    const { storyId } = useParams();
    const isEdit = Boolean(storyId);
    const navigate = useNavigate();

    const [genres, setGenres] = useState([]);
    const [formData, setFormData] = useState({
        coverUrl: '',
        title: '',
        genreId: '',
        content: ''
    });
    const [loading, setLoading] = useState(isEdit);
    const [error, setError] = useState('');

    const coverUrlFull = formData.coverUrl
        ? `http://localhost:8080${formData.coverUrl}`
        : '';

    // 1) Genres einmalig laden
    useEffect(() => {
        fetchAllGenres()
            .then(data => setGenres(Array.isArray(data) ? data : []))
            .catch(() => setError('Genres could not be loaded. Please try again later.'));
    }, []);

    // 2) Reset, wenn aus Edit → Create gewechselt wird
    useEffect(() => {
        if (!isEdit) {
            setFormData({
                coverUrl: '',
                title: '',
                genreId: '',
                content: ''
            });
            setLoading(false);
            setError('');
        }
    }, [isEdit]);

    // 3) Laden im Edit-Modus
    useEffect(() => {
        if (!isEdit) return;
        setLoading(true);
        fetchStoryById(storyId)
            .then(data => {
                setFormData({
                    coverUrl: data.coverUrl || '',
                    title:   data.title      || '',
                    genreId: data.genre?.id?.toString() || '',
                    content: data.content    || ''
                });
            })
            .catch(() => setError('Story could not be loaded. Please try again later.'))
            .finally(() => setLoading(false));
    }, [isEdit, storyId]);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(fd => ({ ...fd, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            coverUrl: formData.coverUrl || null,
            title:    formData.title,
            genre:    { id: Number(formData.genreId) },
            content:  formData.content
        };

        const req = isEdit
            ? updateStory(storyId, payload)
            : createStory(payload);

        req
            .then(() => navigate('/my-stories'))
            .catch(() => setError('Failed to save story. Please try again later.'));
    }

    function handleCancel() {
        navigate(-1);
    }

    if (loading) {
        return <p>Loading…</p>;
    }

    return (
        <div className="create-story">
            <h2 className="page-title">
                {isEdit ? 'Edit Story' : 'Create New Story'}
            </h2>

            {error && <p className="form-error">{error}</p>}

            <form onSubmit={handleSubmit} className="form-layout">
                {/* Linke Spalte: Cover */}
                <div className="cover-column">
                    <CoverDropzone
                        storyId={storyId}
                        existingCoverUrl={coverUrlFull}
                        onUploadSuccess={() => {
                            if (isEdit) {
                                fetchStoryById(storyId).then(data =>
                                    setFormData(fd => ({ ...fd, coverUrl: data.coverUrl || '' }))
                                );
                            }
                        }}
                    />
                </div>

                {/* Rechte Spalte: Details */}
                <div className="details-column">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Genre</label>
                        <select
                            name="genreId"
                            value={formData.genreId}
                            onChange={handleChange}
                            required
                            className="form-input"
                        >
                            <option value="">-- select genre --</option>
                            {genres.map(g => (
                                <option key={g.id} value={g.id}>
                                    {g.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Content</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            className="form-textarea"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">
                            {isEdit ? 'Update Story' : 'Save Story'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
