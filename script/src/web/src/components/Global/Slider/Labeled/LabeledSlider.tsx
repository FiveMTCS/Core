import React from 'react';
import Slider, { SliderTooltip } from 'rc-slider';
import * as Branding from 'components/Branding';

const { Handle } = Slider;

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
	percentage?: boolean;
}

const LabeledSlider: React.FC<IArgs> = ({
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
	percentage = false,
}) => {
	const handle = (props: any) => {
		const { value, dragging, index, ...restProps } = props;

		const formattedValue = Math.ceil(((value - min) / (max - min)) * 100);

		return (
			<SliderTooltip
				prefixCls="rc-slider-tooltip"
				overlay={`${percentage ? formattedValue + ' %' : value}`}
				visible={dragging}
				placement="top"
				key={index}
				overlayInnerStyle={{
					padding: '5px 10px',
					minWidth: '15px',
					backgroundColor: Branding.Colors.Primary.dark,
				}}
			>
				<Handle value={value} {...restProps} />
			</SliderTooltip>
		);
	};

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
			handle={handle}
		/>
	);
};

export default LabeledSlider;
