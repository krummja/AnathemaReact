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
        <button>
          {this.props.text}
        </button>
      </div>
    );
  }
}

export default Button;
