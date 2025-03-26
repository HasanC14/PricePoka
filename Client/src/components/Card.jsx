export default function Card({ product }) {
  const extractNumbersFromString = (str) => {
    const regex = /[0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?/g;
    const matches = str.match(regex);

    if (matches && matches.length > 0) {
      const lastMatch = matches[matches.length - 1];
      const numericString = lastMatch.replace(/,/g, "");
      return parseFloat(numericString);
    } else {
      return "Out Of Stock";
    }
  };

  const price = extractNumbersFromString(product?.price);

  return (
    <a
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg_glass rounded-lg overflow-hidden shadow-md text-prime hover:scale-[103%] transition-all ease-in-out duration-500 p-4 space-y-2"
    >
      <img
        src={product?.img}
        alt={product?.price}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h6 className="text-sm truncate">{product?.name}</h6>

      <p className="text-l font-semibold gradient-text text-left">
        {price === "Out Of Stock" || price === 0 ? "Out Of Stock" : `${price}৳`}
      </p>

      <button className="gradient-btn rounded-md py-2 w-full">
        Add to compare
      </button>
    </a>
  );
}
