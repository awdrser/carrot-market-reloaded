interface IFormButtonProps {
  loading: boolean;
  text: string;
}

export default function FormButton({ loading, text }: IFormButtonProps) {
  return (
    <button
      disabled={loading}
      className="primary-btn h-10 disabled:cursor-not-allowed disabled:bg-neutral-500"
    >
      {loading ? "Loading..." : text}
    </button>
  );
}
