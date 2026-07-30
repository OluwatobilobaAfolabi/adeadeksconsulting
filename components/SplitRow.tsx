import Image from "next/image";

type SplitRowProps = {
  title: string;
  body: React.ReactNode;
  img: string;
  alt: string;
  reverse?: boolean;
  href?: string;
};

export default function SplitRow({ title, body, img, alt, reverse, href = "#" }: SplitRowProps) {
  return (
    <div
      className={`flex flex-col gap-6 lg:items-center ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}
    >
      <div className="relative aspect-[644/532] w-full shrink-0 bg-[#d9d9d9] lg:w-[calc(50%-12px)]">
        <Image
          src={img}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 644px"
        />
      </div>
      <div className="flex flex-col items-start gap-6 lg:flex-1">
        <div className="flex flex-col gap-2">
          <h3 className="heading-card">{title}</h3>
          <p className="text-base leading-[1.41]">{body}</p>
        </div>
        <a href={href} className="btn-yellow h-14">
          Explore more
          <Image src="/images/icon-arrow-right.svg" alt="" width={20} height={20} />
        </a>
      </div>
    </div>
  );
}
