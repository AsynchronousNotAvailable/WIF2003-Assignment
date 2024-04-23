import React, { useState, useRef } from 'react';

function DragDropImageUploader() {
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [fileInputKey, setFileInputKey] = useState(Math.random().toString(36));
    const fileInputRef = useRef(null);

    function selectFiles() {
        fileInputRef.current.click();
    }

    function deleteImage(index) {
        setImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        );
    }
    function onDragOver(event) {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "copy";
    }

    function onDragLeave(event) {
        event.preventDefault();
        setIsDragging(false);
    }
    function onDrop(event) {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue;
            if (!images.some((e) => e.name === files[i].name)) {
                setImages((prevImages => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i])
                    },
                ]))
            }
        }
    }

    function resetFileInput() {
        let randomString = Math.random().toString(36);
        setFileInputKey(randomString);
    }

    function onFilesSelect(event) {
        const files = event.target.files;
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue;
            if (!images.some((e) => e.name === files[i].name)) {
                setImages((prevImages => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i])
                    },
                ]))
            }
        }
        resetFileInput();
    }

    return (
        <>

            <div className="h-36 rounded-lg border-2 border-dashed flex-1 content-center items-center text-center select-none mt-2 visible" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                {isDragging ? (
                    <span className="mx-5 mr-0 cursor-pointer text-blue-400 hover:bg-blue-700">
                        Drop images here
                    </span>
                ) : (
                    <>
                        Drag & Drop image here or {" "}
                        <span className="mx-2 mr-0 cursor-pointer text-blue-400 hover:bg-blue-700" role="button" onClick={selectFiles}>
                            Browse
                        </span></>
                )}


                <input id="product-photo" type="file" key={fileInputKey} className="hidden" name='file' ref={fileInputRef} onChange={onFilesSelect}></input>
            </div>
            <div className="w-full h-auto flex content-start flex-wrap items-start max-h-48 overflow-y-auto mt-10">
                {images.map((images, index) => (
                    <div className="w-20 mr-5 h-80 mb-8 relative" key={index}>
                        <span onClick={() => deleteImage(index)} className="z-50 bg-blue-200">&times;</span>
                        <img className="w-full h-full rounded.lg" src={images.url} alt={images.name}></img>
                    </div>
                ))}
            </div>

        </>
    )
}

export default DragDropImageUploader; 