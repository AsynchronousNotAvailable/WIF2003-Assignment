import React, { useState } from 'react';
import styled from 'styled-components';
import BankRadioButton from './BankRadioButton'; // Assuming this is the correct path to your BankRadioButton component

const OnlineBankingContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OnlineBankingOptions = () => {
  const [selectedBank, setSelectedBank] = useState('');

  const onlineBankingOptions = [
    { imageSrc: '/bankLogo/img_bankmy_am.png', bankName: 'Ambank' },
    { imageSrc: '/bankLogo/img_bankmy_cimb.png', bankName: 'CIMB Clicks' },
    { imageSrc: '/bankLogo/img_bankmy_public_fpx.png', bankName: 'Public Bank' },
    { imageSrc: '/bankLogo/img_bankmy_maybank.png', bankName: 'Maybank2u' },
    { imageSrc: '/bankLogo/img_bankmy_rhb.png', bankName: 'RHB Now' },
    { imageSrc: '/bankLogo/img_bankmy_uob_fpx.png', bankName: 'UOB' },
  ];

  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
  };

  return (
    <OnlineBankingContainer>
      {onlineBankingOptions.map((option, index) => (
        <BankRadioButton
          key={index}
          imageSrc={option.imageSrc}
          bankName={option.bankName}
          onChange={handleBankChange}
          checked={selectedBank === option.bankName}
        />
      ))}
    </OnlineBankingContainer>
  );
};

export default OnlineBankingOptions;
