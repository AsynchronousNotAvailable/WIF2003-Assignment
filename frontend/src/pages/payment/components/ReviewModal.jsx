import React, { useState } from "react";
import styled from "styled-components";
import { Rating } from "react-simple-star-rating";

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${({ open }) => (open ? "block" : "none")};
    z-index: 999;
`;

const ModalContent = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
`;

const InputField = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid rgba(102, 102, 102, 0.2);
`;

const ButtonContainer = styled.div`
    display: flex;
    margin-top: 20px;
    justify-content: flex-end;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #0f60ff;
    color: #fff;
    cursor: pointer;
    margin-left: 10px;
`;
const Text = styled.p`
    font-family: Inter;
    font-size: 18px;
    font-weight: regular;
    display: inline;
    vertical-align: middle;
`;

const AddReviewModal = ({ isOpen, cancelModal, submitReview }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(0);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmitReview = () => {
        const reviewDetails = {
            title: title,
            description: description,
            stars: rating,
        };
        submitReview(reviewDetails);
    };

    const handleRating = (rate) => {
        setRating(rate);
    };

    const clearStars = () => {
        setRating(0);
    };

    const onPointerEnter = () => console.log("Enter");
    const onPointerLeave = () => console.log("Leave");
    const onPointerMove = (value, index) => console.log(value, index);

    return (
        <ModalBackground open={isOpen}>
            <ModalContent>
                <InputField
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Title"
                />
                <InputField
                    type="text"
                    name="description"
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Description"
                />

                <Rating
                    onClick={handleRating}
                    onPointerEnter={onPointerEnter}
                    onPointerLeave={onPointerLeave}
                    onPointerMove={onPointerMove}
                    initialValue={rating}
                    SVGstyle={{ display: "inline" }}
                    style={{ marginRight: "10px" }}
                    allowFraction={true}
                />

                <Button
                    onClick={clearStars}
                    style={{
                        backgroundColor: "white",
                        color: "#0f60ff",
                        verticalAlign: "middle",
                    }}
                >
                    Clear
                </Button>

                <ButtonContainer>
                    <Button
                        onClick={cancelModal}
                        style={{
                            backgroundColor: "white",
                            color: "#0f60ff",
                            borderColor: "#0f60ff",
                            borderWidth: "1px",
                        }}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleSubmitReview}>Submit</Button>
                </ButtonContainer>
            </ModalContent>
        </ModalBackground>
    );
};

export default AddReviewModal;
