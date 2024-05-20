import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import CardRadioButton from './CardRadioButton';
import { GlobalContext } from '../../../context';

// Styled components for the modal
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ open }) => (open ? 'block' : 'none')};
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 35%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 40px 50px;
  border-radius: 2px;
`;

const StyledInput = styled.input`
    border-radius: 12px;
    border: 1px solid #666666;
    opacity: 0.6;
    padding: 10px;
    width: 100%;
`

const PayWithNewCardButton = styled.button`
    border: 1px solid #666666;
    color: #666666;
    padding: 10px 20px;
    cursor: pointer;
    margin-left: 20px;
    margin-bottom: 20px;
    background-color: ${({ selected }) => (selected ? "#666666" : "transparent")};
    color: ${({ selected }) => (selected ? "#FFFFFF" : "#666666")};
`

const Column = styled.div`
    width: ${({ width }) => width};
    flex-shrink: 0;
`;

const Text = styled.p`
    font-family: Inter;
    font-size: 24px;
    font-weight: medium;
`

const CustomButton = styled.button`
  border: 1px solid ${({ borderColor }) => borderColor || "#0F60FF"};
  background-color: ${({ bgColor }) => bgColor || "transparent"};
  color: ${({ color }) => color || "#0F60FF"};
  width: 30%;
  padding: 10px 10px;
  cursor: pointer;
  margin-left: 20px;
`;

const CreditDebitCardForm = ({ onSave, onCancel }) => {
  const { addCardDetails} = useContext(GlobalContext);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [NameOnCard, setNameOnCard] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cardDetails = { cardNumber, expiryDate, cvv };
    onSave(cardDetails);
    addCardDetails(cardDetails);
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setNameOnCard('');
  };

  const handleCancel = () => { 
    onCancel();
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setNameOnCard('');
};

  const handleCardNumberChange = (e) => {
    let cleanedValue = e.target.value.replace(/\D/g, '');
    let formattedValue = '';
    for (let i = 0; i < cleanedValue.length; i++) {
        if (i % 4 === 0 && i !== 0) {
            formattedValue += ' ';
        }
        formattedValue += cleanedValue[i];
    }
    setCardNumber(formattedValue);
  };


  return (
    <form 
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        onSubmit={handleSubmit}>
        <Text>Add new card</Text>
      <div style={{ marginBottom: "10px"}}>
        <StyledInput type="text" value={cardNumber} onChange={handleCardNumberChange} placeholder="Card Number" required />
      </div>
      <div style={{ display: "flex", marginBottom: "10px"}}>
        <Column width="70%"><StyledInput type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} placeholder="Expiry Date" required/></Column>
        <Column width="27%"><StyledInput style={{ marginLeft: "15px" }} type="password" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="CVV" maxLength={3} required/></Column>
      </div>
      <div style={{ marginBottom: "30px"}}>
        <StyledInput type="text" value={NameOnCard} onChange={(e) => setNameOnCard(e.target.value)} placeholder="Name on Card" required/>
      </div>
      <div>
        <CustomButton onClick={onCancel}>Cancel</CustomButton>
        <CustomButton bgColor="#0F60FF" color='white' type="submit">Save Card</CustomButton>
      </div>
      
    </form>
  );
};

const CreditDebitCard = () => {
  const { cardDetails } = useContext(GlobalContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [selectedCard, setSelectedCard] = useState('');

  const handleSaveCard = async (cardDetails) => {
    try {
      const response = await axios.post(`/api/customer/${username}/addCard`, cardDetails);
      console.log('Card added successfully', response.data);
      setModalOpen(false);
    } catch (error) {
      if (error.response) {
          setError(error.response.data.error);
          console.error('Error adding card:', error.response.data.error);
      } else {
          console.error('Error adding card:', error);
          setError(error.message);
      }
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleCardChange = (cardNumber) => {
    setSelectedCard(cardNumber);
    console.log(cardNumber);
  }

  return (
    <div style={{ display: "flex", alignItems: "flex-start"}}>
        <Column width="15%">
            <h2 style={{ marginTop: "10px"}}>Select payment account</h2>
        </Column>
        <Column width="85%">
            <PayWithNewCardButton onClick={() => setModalOpen(true)}>Pay with new card</PayWithNewCardButton>
            <ModalBackground open={modalOpen}>
                <ModalContent>
                    <CreditDebitCardForm onSave={handleSaveCard} onCancel={handleCancel} />
                </ModalContent>
            </ModalBackground>
            {cardDetails.map((card, index) => (
                <CardRadioButton
                    key={index}
                    name={`Card ending in ${card.cardNumber.slice(-4)}`}
                    onChange={() => handleCardChange(card.cardNumber)}
                    checked={selectedCard === card.cardNumber}
                    cardNumber={card.cardNumber}
                />
            ))}
        </Column>
    </div>
  );
};

export default CreditDebitCard;
