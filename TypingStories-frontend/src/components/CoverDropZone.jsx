import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import PropTypes from 'prop-types';


export default function CoverDropzone({ storyId, existingCoverUrl, onUploadSuccess }) {
    const [preview, setPreview] = useState(existingCoverUrl || null);

    // Falls sich das bestehende Cover ändert (Edit-Modus), aktualisiere Preview
    useEffect(() => {
        setPreview(existingCoverUrl || null);
    }, [existingCoverUrl]);

    const onDrop = useCallback(files => {
        const file = files[0];
        if (!file) return;

        // Direkt lokale Vorschau anzeigen
        setPreview(URL.createObjectURL(file));

        // Multipart-FormData bauen
        const form = new FormData();
        form.append('file', file);

        // Upload-Request
        axios
            .post(`http://localhost:8080/api/stories/${storyId}/cover`, form, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(() => {
                if (onUploadSuccess) onUploadSuccess();
            })
            .catch(err => {
                console.error('Cover-Upload failed:', err);
            });
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
            {preview ? (
                <img src={preview} alt="Cover preview" className="cover-preview" />
            ) : (
                <p>{isDragActive ? 'Release to upload …' : 'Drag & Drop here or click'}</p>
            )}
        </div>
    );
}

CoverDropzone.propTypes = {
    storyId:          PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    existingCoverUrl: PropTypes.string,
    onUploadSuccess:  PropTypes.func,
};
