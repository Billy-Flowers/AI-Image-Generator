import React, { useState } from 'react';
import styled from "styled-components";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Avatar from '@mui/material/Avatar';
import { DownloadRounded } from '@mui/icons-material';
import FileSaver from 'file-saver';
import ImagePreview from "./ImagePreview";

const Card = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  border-radius: 15px;
  box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 60};
  filter: ${({ theme }) => theme.imageFilter};
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
  overflow: hidden;
  min-height: 200px;
  
  &:hover {
      box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 60};
      transform: scale(1.05);
  }
  
  &:nth-child(7n+1) {
    grid-column: auto/span 2;
    grid-row: auto/span 2;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    border-radius: 12px;
    min-height: 180px;
    
    &:nth-child(7n+1) {
      grid-column: auto/span 1;
      grid-row: auto/span 1;
    }
  }
  
  @media (max-width: 480px) {
    border-radius: 10px;
    min-height: 250px;
  }
`
const HoverOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  ${Card}:hover & {
    opacity: 1;
  }
`
const Prompt = styled.div`
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.white};
`
const Author = styled.div`
  font-weight: 600px;
  font-size: 13px;
  opacity: 0.8;
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme }) => theme.white};
`

const ImageCard = ({ item  }) => {
  const [showPreview, setShowPreview] = useState(false);
  
  const safeItem = item || {};
  
return (
    <>
      <Card onClick={() => setShowPreview(true)}>
        {safeItem.photo && <LazyLoadImage alt={safeItem.prompt} style={{ borderRadius: "12px"}} width="100%" src={safeItem.photo}/>}
        <HoverOverlay>
          <Prompt>{safeItem.prompt}</Prompt>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Author>
              <Avatar sx={{ height: "32px", width: "32px"}}>{safeItem.name?.[0]}</Avatar>
              {safeItem.name}
            </Author>
            {safeItem.photo && <DownloadRounded onClick={(e) => {
              e.stopPropagation();
              FileSaver.saveAs(safeItem.photo, "download.jpg");
            }}/>}
          </div>           
        </HoverOverlay>
      </Card>
      {showPreview && (
        <ImagePreview 
          image={safeItem.photo} 
          prompt={safeItem.prompt}
          author={safeItem.name}
          onClose={() => setShowPreview(false)} 
        />
      )}
      </>
  );
};

export default ImageCard;


