import React, { Children, ReactNode } from "react";

interface ShowProps {
    children: ReactNode;
}

interface WhenProps {
    isTrue: any;
    children: ReactNode;
}

interface ElseProps {
    render?: ReactNode;
    children?: ReactNode;
}

export const Show = (props: ShowProps) => {
    let when: ReactNode | null = null;
    let otherwise: ReactNode | null = null;

    Children.forEach(props.children, (child) => {
        if (!React.isValidElement(child)) return;

        if (child.props.isTrue === undefined) {
            otherwise = child;
        } else if (!when && child.props.isTrue === true) {
            when = child;
        }
    });

    return when ?? otherwise;
};

Show.When = ({ isTrue, children }: WhenProps) => (isTrue ? children : null);
Show.Else = ({ render, children }: ElseProps) => render || children;
