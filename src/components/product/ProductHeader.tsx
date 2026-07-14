import React from "react";
import {
  Image,
  StyleSheet,
} from "react-native";

import AppCard from "../ui/AppCard";
import AppText from "../ui/AppText";

type Props = {
  product: any;
};

export default function ProductHeader({
  product,
}: Props) {
  return (
    <AppCard>

      {!!product.imageUrl && (
        <Image
          source={{
            uri: product.imageUrl,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <AppText style={styles.title}>
        {product.name}
      </AppText>

      {!!product.brand && (
        <AppText>
          {product.brand}
        </AppText>
      )}

      {!!product.category && (
        <AppText>
          {product.category}
        </AppText>
      )}

      <AppText>
        Barcode: {product.barcode}
      </AppText>

    </AppCard>
  );
}

const styles = StyleSheet.create({

  image: {
    width: "100%",
    height: 220,
    marginBottom: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },

});