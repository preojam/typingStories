import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

export default function CoverDropzone({ storyId, existingCoverUrl, onUploadSuccess }) {
    const [preview, setPreview] = useState(existingCoverUrl || null);

    // Update Preview, wenn sich existingCoverUrl ändert
    useEffect(() => {
        setPreview(existingCoverUrl || null);
    }, [existingCoverUrl]);

    const onDrop = useCallback(async files => {
        const file = files[0];
        if (!file) return;

        // Lokale Vorschau anzeigen
        setPreview(URL.createObjectURL(file));

        // Multipart-FormData bauen
        const form = new FormData();
        form.append('file', file);

        try {
            const res = await fetch(`http://localhost:8080/api/stories/${storyId}/cover`, {
                method: 'POST',
                body: form
            });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Upload-Fehler ${res.status}: ${text}`);
            }
            // Erfolgreich hochgeladen
            onUploadSuccess?.();
        } catch (err) {
            console.error('Cover-Upload failed:', err);
        }
    }, [storyId, onUploadSuccess]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false
    });

    return (
        <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? 'active' : ''}`}
        >
            <input {...getInputProps()} />
            {preview
                ? <img src={preview} alt="Cover preview" className="cover-preview" />
                : <p>{isDragActive ? 'Release to upload …' : 'Drag & Drop here or click'}</p>
            }
        </div>
    );
}

CoverDropzone.propTypes = {
    storyId:          PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    existingCoverUrl: PropTypes.string,
    onUploadSuccess:  PropTypes.func,
};
