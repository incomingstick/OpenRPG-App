import React from 'react';
import { Button } from 'semantic-ui-react';

require('../../scss/slider.scss');

type SliderState = {
    children: React.Component[];
    currIndex: number;
};

export default class Slider extends React.Component<any, SliderState> {
    /**
     * Slider.Item is the container for each item within the Slider
     */
    public static Item = class extends React.Component<any, any> {
        public constructor(props: any, context?: any) {
            super(props, context);
        }

        public render() {
            return (
                <div className='slider-item' style={this.props.style}>
                    {this.props.children}
                </div>
            );
        }
    };

    public constructor(props: any, context?: SliderState) {
        super(props, context);

        this.state = {
            children: props.children,
            currIndex: 0
        };
    }

    public render() {
        const { children, currIndex } = this.state;

        return (
            <>
                <div className='controler'>
                    <Button className='btn prev' onClick={this.slidePrev} disabled={currIndex === 0}>
                        Prev
                    </Button>
                    <Button className='btn next' onClick={this.slideNext} disabled={currIndex === children.length - 1}>
                        Next
                    </Button>
                </div>
                <div className='slider' style={{ transform: `translateX(-${currIndex * 100}%)` }}>
                    {children.map((child: any, index: number) => (
                        <Slider.Item key={index}>{child}</Slider.Item>
                    ))}
                </div>
            </>
        );
    }

    public slidePrev = (event: any) => {
        event.preventDefault();

        const prev = this.state.currIndex - 1;

        this.setState({ currIndex: prev });
    };

    public slideNext = (event: any) => {
        event.preventDefault();

        const next = this.state.currIndex + 1;

        this.setState({ currIndex: next });
    };
}
