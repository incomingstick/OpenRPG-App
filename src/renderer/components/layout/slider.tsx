import React from 'react';

type SliderState = {
    page: any;
    left: number[];
};

type ItemState = {
    visible: boolean;
};

export default class Slider extends React.Component<any, SliderState> {
    /**
     * Slider.Item is the container for each item within the Slider
     */
    public static Item = class extends React.Component<any, ItemState> {
        public constructor(props: any, context?: ItemState) {
            super(props, context);
            this.state = {
                visible: true
            };
        }

        public isVisible() {
            if (this.props.left < 0) {
                return false;
            }
            if (this.props.left >= window.innerWidth) {
                return false;
            }
            return true;
        }

        public move() {
            if (this.props.left !== this.props.from) {
                this.setState({ visible: true });
            }
            this.asyncRender();
        }

        public async asyncRender() {
            await new Promise((resolve: any) => setTimeout(resolve, 1000));
            this.setState({ visible: this.isVisible() });
        }

        public render() {
            return (
                <div className='slider-item' style={{ transform: 'translateX(' + this.props.left + 'px)' }}>
                    {this.state.visible && this.props.children}
                </div>
            );
        }
    };

    public width: number;

    public constructor(props: any, context?: SliderState) {
        super(props, context);

        this.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const left = props.children.map(() => this.width) as number[];
        if (left.length > 0) {
            left[0] = 0;
        }

        this.state = {
            page: 0,
            left
        };
    }

    public render() {
        const currItem = React.Children.map(this.props.children, (page: any, index: number) =>
            React.cloneElement(page, { left: this.state.left[index] })
        );

        return <div className='slider'>{currItem}</div>;
    }

    public slide = (page: any) => {
        const left = this.state.left.slice();
        if (page >= left.length) {
            page = 0;
        }
        for (let i = 0; i < left.length; i++) {
            if (i < page) {
                left[i] = -this.width;
            } else if (i === page) {
                left[i] = 0;
            } else {
                left[i] = this.width;
            }
        }
        this.setState({ left, page });
    };
}
