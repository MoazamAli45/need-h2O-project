import Image from "next/image";
import Wrapper from "../shared/Wrapper";

const AboutSection = () => {
  return (
    <section>
      <Wrapper>
        <div className="flex  flex-wrap flex-col space-y-4 my-2">
          <div className="relative w-full h-[400px]">
            <Image
              src="/about/about.jpg"
              alt="About Us"
              fill
              priority
              className="w-full h-full object-cover object-center rounded-lg"
            />
          </div>
          <div className="w-full ">
            <h2 className="text-[35px] md:text-[40px]  font-bold ">
              We&apos;re your local bulk water supplier. 100% NZ owned and
              operated, and we&apos;ve lived in North West Auckland for over 45
              years.
            </h2>
            <div className="flex-col space-y-4">
              <p className="text-[16px] font-medium text-justify">
                Blake&apos;s Quality Water was started in 2021 as we saw the
                need for another bulk water supplier in the area. We&apos;ve
                watched the population in the region grow exponentially, and
                we&apos;ve found it increasingly difficult to get a reliable or
                urgent water delivery.
              </p>
              <p className="text-[16px] font-medium text-justify">
                We know in the Summer season when trying to call it can be
                difficult to get through to busy water delivery drivers.
                That&apos;s why we&apos;ve created an easy online booking system
                where you can organise your delivery online. Sometimes it
                isn&apos;t a straightforward booking, or you need to speak with
                a real human being. In those instances we&apos;re only a phone
                call away.
              </p>
              <p className="text-[16px] font-medium text-justify">
                With long hot summers becoming more common, we want to be of
                service to our friends and neighbours. So our mission is to
                ensure everyone in our communities has access to clean water
                when their tanks run low. delivery.
              </p>
              <p className="text-[16px] font-medium text-justify">
                We&apos;ve also teamed up with a local family who have access to
                premium quality natural spring water. A pure source that
                we&apos;re so lucky to have in the local area. Testing has
                proven how rich this water is in natural minerals. It really is
                superior quality, and is a fantastic substitute to Auckland
                City&apos;s chlorinated water supply. We&apos;re excited to be
                in partnership with this family, and to be able to supply
                superior quality water from a local source, delivered by a local
                company.
              </p>
            </div>
          </div>
          <div className="flexx flex-col space-y-2">
            <h3 className="text-[25px] md:text-[30px]  font-bold ">
              We are for locals, by locals.
            </h3>
            <p>
              We love our little corner of the world and love giving back to the
              community. If you are a community organization or event and you
              need water, please give us a call on{" "}
              <a href="tel:022" className="text-blue-600">
                022 NEED H2O.
              </a>
            </p>
          </div>
          {/*  Civil */}
          <div className="flex flex-col spaxe-y-4">
            <Image
              src={"/about/blake-civil.png"}
              alt="blake-civil"
              width={300}
              height={120}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="flex flex-col space-y-4">
              <p className="text-[16px] font-medium text-justify">
                You might think our branding looks familiar, that&apos;s because
                we&apos;re a sister company to Blake Civil Construction Ltd.
                Blake Civil Construction has been providing Earthworks,
                Drainage, Retaining and Concrete services to the Auckland region
                for the last 25 years.
              </p>
              <p className="text-[16px] font-medium text-justify">
                If we can be of service please contact us on{" "}
                <a href="tel:022" className="text-blue-600">
                  {" "}
                  0508 4 BLAKE{" "}
                </a>
                . Or find us at www.blakecivil.nz
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default AboutSection;
