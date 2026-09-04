function createFingerprintKey(fingerprint) {

    const tokens =

        [

            ...new Set(

                fingerprint.tokens

            )

        ]

            .sort();


    return [

        fingerprint.brand,

        ...tokens,

        fingerprint.quantity ?? "",

        fingerprint.unit ?? "",

        fingerprint.packCount ?? 1

    ].join("|");

}

module.exports = {

    createFingerprintKey

};