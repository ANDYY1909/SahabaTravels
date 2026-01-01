interface VisaCardProps {
  country: string;
  countryCode: string;
  price: string;
}

const VisaCard = ({ country, countryCode, price }: VisaCardProps) => {
  return (
    <div className="flex-shrink-0 w-64 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-6 border border-gray-100">
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 mb-4 rounded-full overflow-hidden shadow-md border-2 border-gray-200">
          <img
            src={`https://flagcdn.com/w160/${countryCode}.png`}
            srcSet={`https://flagcdn.com/w320/${countryCode}.png 2x`}
            alt={`${country} flag`}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{country}</h3>
        <p className="text-orange-600 font-semibold text-lg">
          Visa from {price}
        </p>
      </div>
    </div>
  );
};

export default VisaCard;
