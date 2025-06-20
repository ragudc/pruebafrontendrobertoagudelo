import React from 'react';
import styled from 'styled-components';

interface Props {
  sizes: string[];
  onSelect: (size: string) => void;
}

const Selector = styled.select`
  padding: 0.5em;
  margin-top: 1em;
`;

const SizeSelector: React.FC<Props> = ({ sizes, onSelect }) => (
  <div>
    <label htmlFor="talla"><strong> Talla: </strong></label>
    <Selector id="talla" onChange={e => onSelect(e.target.value)}>
      <option value="">Selecciona una talla</option>
      {sizes.map(size => (
        <option key={size} value={size}>{size}</option>
      ))}
    </Selector>
  </div>
);

export default SizeSelector;