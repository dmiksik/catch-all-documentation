export function Footer() {
   return (
      <footer className="mt-auto border-t pt-8">
         {/* Plná šířka středního sloupce. width/height dle viewBoxu SVG (2094x310),
             aby element dostal správný poměr stran a obrázek se nevertikálně
             neposouval / neletterboxoval. */}
         {/* eslint-disable-next-line @next/next/no-img-element */}
         <img
            src="https://datarepo.eosc.cz/static/images/eu_msmt_eosc_en.svg"
            alt="Co-funded by the European Union, MŠMT and EOSC"
            width={2094}
            height={310}
            className="w-full h-auto"
         />
      </footer>
   );
}
