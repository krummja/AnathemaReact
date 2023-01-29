import { Component } from 'react';


type ButtonProps = {
  text: string,
  callback: () => any,
};

type ButtonState = {
  count: number,
};

class Button extends Component<ButtonProps, ButtonState>
{
  state: ButtonState = {
    count: 0,
  };

  render = () => {
    return (
      <div>
        <button onClick={() => this.increment(1)}>
          {this.props.text} {this.state.count}
        </button>
      </div>
    );
  }

  increment = async (n: number) => {
    const result = await this.props.callback();

    if (result != null) {
        this.setState(() => ({
            count: result.data.data.value,
        }));
    } else {
        this.setState((state) => ({
          count: state.count + n,
        }));
    }

  };
}

export default Button;
