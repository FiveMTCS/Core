import React from 'react';
import Slider from 'rc-slider';
import * as Branding from 'components/Branding';

interface IArgs {
	trackColor?: string;
	railColor?: string;
	dotColor?: string;
	min?: number;
	max?: number;
	defaultValue?: number;
	value?: number;
	step?: number;
	width?: string;
	onChange: (value: number) => void;
}

const NormalSlider: React.FC<IArgs> = ({
	trackColor = Branding.Colors.Primary.normal,
	railColor = Branding.Colors.Gray.line,
	dotColor = Branding.Colors.Primary.light,
	min = 0,
	max = 100,
	step = 1,
	defaultValue = 0,
	value = 0,
	width = '300px',
	onChange,
}) => {
	return (
		<Slider
			min={min}
			max={max}
			step={step}
			defaultValue={defaultValue}
			value={value}
			trackStyle={{
				height: '12px',
				backgroundColor: trackColor,
			}}
			railStyle={{
				height: '12px',
				backgroundColor: railColor,
			}}
			handleStyle={{
				height: '25px',
				width: '25px',
				border: `2px ${dotColor} solid`,
			}}
			style={{ width: width, height: '25px' }}
			onChange={onChange}
		/>
	);
};

export default NormalSlider;
