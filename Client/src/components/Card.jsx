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
  return (
    <a
      href={product.link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg_glass rounded-lg overflow-hidden shadow-md text-prime hover:scale-105 transition-all ease-in-out duration-500 p-2 space-y-2"
    >
      <img
        src={product?.img}
        alt={product?.price}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h6 className="text-sm truncate">{product?.name}</h6>

      <p className="text-xl font-semibold pb-3 gradient-text">
        {extractNumbersFromString(product?.price) == 0
          ? "Out Of Stock"
          : extractNumbersFromString(product?.price)}
        ৳
      </p>
      {/* <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        View Product
                      </a> */}
    </a>
  );
}
