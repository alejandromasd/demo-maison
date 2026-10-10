type Props = {
  expanded: boolean;
  onClick: () => void;
};

export default function MenuToggle({ expanded, onClick }: Props) {
  return (
    <button
      className="menu-toggle"
      type="button"
      aria-label={expanded ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={expanded}
      onClick={onClick}
    >
      <span />
      <span />
      <span />
    </button>
  );
}
