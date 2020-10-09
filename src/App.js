import React, { useState, useEffect, useCallback } from "react";
import {
  theme,
  ThemeProvider,
  CSSReset,
  Spinner,
  Text,
  Heading,
} from "@chakra-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "./components/Header/Header";
import AdvisorCard from "./components/AdvisorCard/AdvisorCard";
import Filters from "./components/Filters/Filters";
import { getAdvisors, getLanguages, ERROR } from "./api";

const breakpoints = ["360px", "768px", "1024px", "1440px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

export const newTheme = {
  ...theme,
  breakpoints,
  fonts: {
    body: "Georgia, serif",
    heading: "Georgia, serif",
    mono: "Menlo, monospace",
  },
};

function App() {
  const [lastSearchParams, setLastSearchParams] = useState();
  const [limit, setLimit] = useState(20);
  const [count, setCount] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [advisors, setAdvisors] = useState([]);
  const [languages, setLanguages] = useState([]);

  const search = useCallback(async ({ name, language, newLimit } = {}) => {
    const res = await getAdvisors(name, language, newLimit);
    if (res === ERROR) {
      return setAdvisors(res);
    }
    const { count, advisors, hasMore } = res;

    setLastSearchParams({ name, language });
    setAdvisors(advisors);
    setCount(count);
    setHasMore(hasMore);
  }, []);

  useEffect(() => {
    search();
    getLanguages().then(setLanguages);
  }, [search]);

  const hasError = advisors === ERROR || languages === ERROR;

  return (
    <ThemeProvider theme={newTheme}>
      <CSSReset />
      <Header />
      <div className="container">
        <Heading as="h1" size="lg" m={8}>
          Find your Advisor today
        </Heading>
        <Filters languages={languages} submit={search} />
        {hasError && (
          <Text>
            There seems to have been an error. Please contact the developer who
            build this
          </Text>
        )}
        {typeof count !== "undefined" && (
          <Heading ml={8} mb={0} as="h4" size="sm">
            {count} advisors found
          </Heading>
        )}
        <Text ml={8} mb={-8} color="grey.100">
          The list is sorted by online first and reviews count.
        </Text>
        {advisors && !hasError && (
          <InfiniteScroll
            dataLength={advisors.length}
            next={() => {
              const newLimit = limit + 20;

              setLimit(newLimit);
              search({ ...lastSearchParams, newLimit });
            }}
            hasMore={hasMore}
            loader={
              <div className="container">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </div>
            }
            endMessage={
              <div className="container">
                <Heading m={8} mt={12} mb={12} as="h4" size="sm">
                  Try changing the filters if you didn't find an advisor on the
                  list.
                </Heading>
              </div>
            }
          >
            {!!advisors.length &&
              advisors.map((advisor) => (
                <AdvisorCard key={advisor.id} advisor={advisor} />
              ))}
          </InfiniteScroll>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
