export interface Product {
  id: number;
  name: string;
  options: [SizeOption, ColorOption];
  description: string;
}

export interface SizeOption {
  name: string;
  values: SizeValue[];
}

export interface ColorOption {
  name: string;
  values: ColorValue[];
}

export interface SizeValue {
  label: string;
  price: number;
}

export interface ColorValue {
  label: string;
  hex: string;
}
