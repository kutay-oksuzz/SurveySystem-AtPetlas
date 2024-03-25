
import ContentTop from "../../../../components/ContentTop";
import ContentMain from "../../../../components/ContentMain";

const Content = () => {
  return (
    <>
      <style>
        {`
        .main-content {
          background-color: var(--clr-secondary);
          flex: 1;
          padding: 32px;
        }
      
        @media screen and (max-width: 1400px) {
          .main-content {
            padding-left: 20px;
            padding-right: 20px;
          }
          
        }
        
      
        @media screen and (max-width: 1200px) {
          .main-content {
            padding-right: 16px;
            padding-left: 16px;
          }
        }
        `}
      </style>
      <div className="main-content">
        <ContentTop />
        <ContentMain />
      </div>
    </>
  );
};

export default Content;
