import './Card.css';

function Card({ children, className = '', as: Component = 'div', href, ...props }) {
  const classes = ['card', className].filter(Boolean).join(' ');
  const content = <div className="card-inner">{children}</div>;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <Component className={classes} {...props}>
      {content}
    </Component>
  );
}

export default Card;
