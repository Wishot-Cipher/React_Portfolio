import React, {useEffect} from 'react'


export const Filter = ({project, setFiltered, activeSection, setActiveSection}) => {
   useEffect(() => {
     if (activeSection === "all"){
      setFiltered(project);
      return;
     }
     const filtered = project.filter((sec) =>
     sec.section.includes(activeSection)
     );
     setFiltered(filtered)
    //  console.log(filtered);

   }, [activeSection])
   
  return (
    <div>
        
          <div class="row">
                <div class="col-lg-12 d-flex justify-content-center">
                <ul id="portfolio-flters">
                    <li  className={ activeSection ==="all" ? "filter-active" : ""} onClick={() => setActiveSection("all")}>All</li>
                    <li  className={ activeSection ==="app" ? "filter-active" : ""}  onClick={() => setActiveSection("app")}>App</li>
                    <li  className={ activeSection ==="api" ? "filter-active" : ""} onClick={() => setActiveSection("api")}>API's</li>
                    <li  className={ activeSection ==="others" ? "filter-active" : ""} onClick={() => setActiveSection("others")}>Others..</li>
                </ul>
                </div>
            </div>

    </div>
  )
}
